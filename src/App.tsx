import { useState, useEffect } from "react";
import "./App.css";
import { getCurrentTabUId, getCurrentTabUrl } from "./chrome-services/utils/tabs";
import { MessageType } from "./types/types";
import { storageAllEnabled, storageExclusionList, storageInclusionList } from "./constants/constants"
import EditableList from "./list/EditableList";
import 'react-list-editable/lib/react-list-editable.css';
import LabeledSwitch from "./option/LabeledSwitch";

export default function App() {
  const [url, setUrl] = useState<string | undefined>("");
  const [enablePage, setEnablePage] = useState<boolean>(false);
  const [enableAll, setEnableAll] = useState<boolean>(false);
  const [inclusionList, setInclusionList] = useState<string[]>([]);
  const [exclusionList, setExclusionList] = useState<string[]>([]);

  useEffect(() => {
    getCurrentTabUrl(setUrl);
    chrome.storage.local.get([storageAllEnabled]).then((result) => setEnableAll(result[storageAllEnabled]));
    chrome.storage.local.get([storageInclusionList]).then((result) => setInclusionList(result[storageInclusionList]));
    chrome.storage.local.get([storageExclusionList]).then((result) => setExclusionList(result[storageExclusionList])); 
  }, []);

  useEffect(() => {
    if (!url) return;
    chrome.storage.session.get([storageInclusionList]).then((result) => {
      if (result[storageInclusionList].some((item: string) => url.match(".*" + item + ".*"))) {
        setEnablePage(true);
      } else {
        chrome.storage.session.get([storageExclusionList]).then((result) => {
          if (result[storageExclusionList].some((item: string) => url.match(".*" + item + ".*"))) {
            setEnablePage(false);
          } else {
            setEnablePage(enableAll);
          }
        });
      }
    });
  }, [url]);

  function sendMessage(type: MessageType) {
    getCurrentTabUId((id) => {
      id && chrome.tabs.sendMessage(id, { message: type });
    });
  }


  chrome.storage.local.set({ asdf: "valueAsdf" }).then(() => {
    console.log("Value is set");
  });

  function togglePage(value: boolean) {
    sendMessage((value) ? MessageType.ADD : MessageType.REMOVE);
    if (url) {
      if (value) {
        chrome.storage.session.get([storageInclusionList]).then((result) => {
          let list: string[] = result[storageInclusionList];
          if(!list.includes(url)) {
            list.push(url);
            chrome.storage.session.set({[storageInclusionList]: list});
          }
        })
      }
    }
  }


  function changeEnableAll(value: boolean) {
    if (enableAll) {
      if (url && inclusionList.some((item) => url.match(".*" + item + ".*"))) sendMessage(MessageType.ADD);
    }
    else {
      if (url && exclusionList.some((item) => url.match(".*" + item + ".*"))) sendMessage(MessageType.REMOVE);
    }
    setEnableAll(value);
  }

  function changeExceptionList(list: string[]) {
    if (enableAll) {
      if (url && list.some((item) => url.match(".*" + item + ".*"))) sendMessage(MessageType.REMOVE);
      setExclusionList(list);
    }
    else {
      if (url && list.some((item) => url.match(".*" + item + ".*"))) sendMessage(MessageType.ADD);
      setInclusionList(list);
    }
  }


  return (
    <div className="App">
      <LabeledSwitch label={(url) ? url : ""} checked={enablePage} onChange={togglePage} />
      <LabeledSwitch label={"All sites"} checked={enableAll} onChange={changeEnableAll} />
      <EditableList list={(enableAll) ? exclusionList : inclusionList} onEdit={changeExceptionList} />
    </div>
  );
}