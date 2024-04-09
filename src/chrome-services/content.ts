import { ChromeMessage, MessageType } from "../types/types";
import { storageAllEnabled, storageInclusionList, storageExclusionList } from "../constants/constants"

type matcher = {
  name: string,
  regex: string,
  link: string
}

const SINGLE_MATCHERS: matcher[] = [
  { name: "Genesis", regex: "gen(esis)?\\.?$", link: "/ot/gen/" },
  { name: "Exodus", regex: "ex(odus)?\\.?$", link: "/ot/ex/" },
  { name: "Leviticus", regex: "lev(iticus)?\\.?$", link: "/ot/lev/" },
  { name: "Numbers", regex: "num(bers)?\\.?$", link: "/ot/num/" },
  { name: "Deuteronomy", regex: "deut(eronomy|\\.)$", link: "/ot/deut/" },
  { name: "Joshua", regex: "josh(ua)?\\.?$", link: "/ot/josh/" },
  { name: "Judges", regex: "judg(es)?\\.?$", link: "/ot/judg/" },
  { name: "Ruth", regex: "ruth$", link: "/ot/ruth/" },
  { name: "Ezra", regex: "ezra$", link: "/ot/ezra/" },
  { name: "Nehemiah", regex: "neh(emiah)?\\.?$", link: "/ot/neh/" },
  { name: "Esther", regex: "esth(er)?\\.?$", link: "/ot/esth/" },
  { name: "Job", regex: "job$", link: "/ot/job/" },
  { name: "Psalms", regex: "ps(alms)?\\.?$", link: "/ot/ps/" },
  { name: "Proverbs", regex: "prov(erbs)?\\.?$", link: "/ot/prov/" },
  { name: "Ecclesiastes", regex: "eccl(esiastes)?\\.?$", link: "/ot/eccl/" },
  { name: "Song of Solomon", regex: "song\\.$", link: "/ot/song/" },
  { name: "Isaiah", regex: "isa(iah)?\\.?$", link: "/ot/isa/" },
  { name: "Jeremiah", regex: "jer(emiah)?\\.?$", link: "/ot/jer/" },
  { name: "Lamentations", regex: "lam(entations)?\\.?$", link: "/ot/lam/" },
  { name: "Ezekiel", regex: "ezek(iel)?\\.?$", link: "/ot/ezek/" },
  { name: "Daniel", regex: "dan(iel)?\\.?$", link: "/ot/dan/" },
  { name: "Hosea", regex: "hosea$", link: "/ot/hosea/" },
  { name: "Joel", regex: "joel$", link: "/ot/joel/" },
  { name: "Amos", regex: "amos$", link: "/ot/amos/" },
  { name: "Obadiah", regex: "obad(iah)?\\.?$", link: "/ot/obad/" },
  { name: "Jonah", regex: "jonah$", link: "/ot/jonah/" },
  { name: "Micah", regex: "micah$", link: "/ot/micah/" },
  { name: "Nahum", regex: "nahum$", link: "/ot/nahum/" },
  { name: "Habakkuk", regex: "hab(akkuk)?\\.?$", link: "/ot/hab/" },
  { name: "Zephaniah", regex: "zeph(aniah)?\\.?$", link: "/ot/zeph/" },
  { name: "Haggai", regex: "hag(gai)?\\.?$", link: "/ot/hag/" },
  { name: "Zechariah", regex: "zech(ariah)?\\.?$", link: "/ot/zech/" },
  { name: "Malachi", regex: "mal(achi)?\\.?$", link: "/ot/mal/" },
  { name: "Matthew", regex: "matt(hew)?\\.?$", link: "/nt/matt/" },
  { name: "Mark", regex: "mark$", link: "/nt/mark/" },
  { name: "Luke", regex: "luke$", link: "/nt/luke/" },
  { name: "John", regex: "john$", link: "/nt/john/" },
  { name: "Acts", regex: "acts$", link: "/nt/acts/" },
  { name: "Romans", regex: "rom(ans)?\\.?$", link: "/nt/rom/" },
  { name: "Galatians", regex: "gal(atians)?\\.?$", link: "/nt/gal/" },
  { name: "Ephesians", regex: "eph(esians)?\\.?$", link: "/nt/eph/" },
  { name: "Philippians", regex: "philip(pians)?\\.?$", link: "/nt/philip/" },
  { name: "Colossians", regex: "col(ossians)?\\.?$", link: "/nt/col/" },
  { name: "Titus", regex: "titus$", link: "/nt/titus/" },
  { name: "Philemon", regex: "philem(on)?\\.?$", link: "/nt/philem/" },
  { name: "Hebrews", regex: "heb(rews)?\\.?$", link: "/nt/heb/" },
  { name: "James", regex: "james$", link: "/nt/james/" },
  { name: "Jude", regex: "jude$", link: "/nt/jude/" },
  { name: "Revelation", regex: "rev(elation)?\\.?$", link: "/nt/rev/" },
  { name: "Jacob", regex: "jacob", link: "/bofm/jacob/" },
  { name: "Enos", regex: "enos$", link: "/bofm/enos/" },
  { name: "Jarom", regex: "jarom$", link: "/bofm/jarom/" },
  { name: "Omni", regex: "omni$", link: "/bofm/omni/" },
  { name: "Mosiah", regex: "mosiah$", link: "/bofm/mosiah/" },
  { name: "Alma", regex: "alma$", link: "/bofm/alma/" },
  { name: "Mormon", regex: "morm(on)?\\.?$", link: "/bofm/morm/" },
  { name: "Ether", regex: "ether$", link: "/bofm/ether/" },
  { name: "Moroni", regex: "moro(ni)?\\.?$", link: "/bofm/moro/" },
  { name: "Doctrine and Covenants", regex: "d\\.?&c\\.?$", link: "/dc-testament/dc/" },
  { name: "Official Declaration", regex: "o\\.?d\\.?$", link: "/dc-testament/od/" },
  { name: "Moses", regex: "moses$", link: "/pgp/moses/" },
  { name: "Abraham", regex: "abr(aham|\\.)$", link: "/pgp/abr/" },
  { name: "Joseph Smith—Matthew", regex: "js—m$", link: "/pgp/js—m/" },
  { name: "Joseph Smith—History", regex: "js—h$", link: "/pgp/js—h/" }
]


const DOUBLE_MATCHERS: matcher[] = [
  { name: "1 Samuel", regex: "1(st)? sam(uel)?\\.?$", link: "/ot/1-sam/" },
  { name: "2 Samuel", regex: "2(nd)? sam(uel)?\\.?$", link: "/ot/2-sam/" },
  { name: "1 Kings", regex: "1(st)? k(ings|gs\\.)$", link: "/ot/1-kgs/" },
  { name: "2 Kings", regex: "2(nd)? k(ings|gs\\.)$", link: "/ot/2-kgs/" },
  { name: "1 Chronicles", regex: "1(st)? chr(onicles)?\\.?$", link: "/ot/1-chr/" },
  { name: "2 Chronicles", regex: "2(nd)? chr(onicles)?\\.?$", link: "/ot/2-chr/" },
  { name: "1 Corinthians", regex: "1(st)? cor(inthians)?\\.?$", link: "/nt/1-cor/" },
  { name: "2 Corinthians", regex: "2(nd)? cor(inthians)?\\.?$", link: "/nt/2-cor/" },
  { name: "1 Thessalonians", regex: "1(st)? thes(salonians)?\\.?$", link: "/nt/1-thes/" },
  { name: "2 Thessalonians", regex: "2(nd)? thes(salonians)?\\.?$", link: "/nt/2-thes/" },
  { name: "1 Timothy", regex: "1(st)? tim(othy)?\\.?$", link: "/nt/1-tim/" },
  { name: "2 Timothy", regex: "2(nd)? tim(othy)?\\.?$", link: "/nt/2-tim/" },
  { name: "1 Peter", regex: "1(st)? pet(er)?\\.?$", link: "/nt/1-pet/" },
  { name: "2 Peter", regex: "2(nd)? pet(er)?\\.?$", link: "/nt/2-pet/" },
  { name: "1 John", regex: "1(st)? j(ohn|n\\.)$", link: "/nt/1-jn/" },
  { name: "2 John", regex: "2(nd)? j(ohn|n\\.)$", link: "/nt/2-jn/" },
  { name: "3 John", regex: "3(rd)? j(ohn|n\\.)$", link: "/nt/3-jn/" },
  { name: "1 Nephi", regex: "1(st)? ne(phi)?\\.?$", link: "/bofm/1-ne/" },
  { name: "2 Nephi", regex: "2(nd)? ne(phi)?\\.?$", link: "/bofm/2-ne/" },
  { name: "3 Nephi", regex: "3(rd)? ne(phi)?\\.?$", link: "/bofm/3-ne/" },
  { name: "4 Nephi", regex: "4(th)? ne(phi)?\\.?$", link: "/bofm/4-ne/" },
  { name: "Official Declaration", regex: "O(fficial)?\\.?? D(eclaration)?\\.??$", link: "/dc-testament/od/" }
]

const TRIPLE_MATCHERS: matcher[] = [
  { name: "Song of Solomon", regex: "song of solomon$", link: "/ot/gen/" },
  { name: "Words of Mormon", regex: "w(ords)?\\.?? of m(ormon)?\\.??$", link: "/bofm/w-of-m/" },
  { name: "Doctrine and Covenants", regex: "d(octrine)?\\.?? (and|&) c(ovenants)?\\.??$", link: "/dc-testament/dc/" },
  { name: "Articles of Faith", regex: "a(rticles)?\\.?? of f(aith)?\\.??$", link: "/pgp/a-of-f/" }
]

const DASHES = "\\-\u2013\u2014";
const REFERENCE_MATCH = `^[0-9]+([${DASHES}][0-9]+|:[0-9]+([${DASHES}][0-9]+)?)?[^\\w]*$`;
const SPLIT_REGEX = `[^a-zA-Z0-9${DASHES}:\\.\\&]`;
const BASE_LINK = "https://www.churchofjesuschrist.org/study/scriptures";

class VisitorNode extends Node {
  visited: boolean = false;
  static of(node: Node) {
    let ret = node as unknown as VisitorNode;
    ret.visited = false;
    return ret;
  }
}

function matcher(node: VisitorNode, bookName: string, reference: string, matchers: matcher[]) {
  if (reference.match(REFERENCE_MATCH)) {
    for (const matcher of matchers) {
      if (bookName.toLowerCase().match(matcher.regex)) {
        console.log("FOUND " + bookName);
        let str = bookName + " " + reference;
        let link = BASE_LINK + matcher.link;
        let i = 0;
        let split = reference.split("");
        while (i < split.length && split[i] >= '0' && split[i] <= '9') {
          link += split[i];
          i++;
        }
        if (i < split.length && reference.substring(i).match(`^:[0-9]+([${DASHES}][0-9]+)?[^\\w]*$`)) {
          i++;
          let verse = "";
          link += "?id="
          while (i < split.length && split[i] >= '0' && split[i] <= '9') {
            verse += split[i];
            i++;
          }
          link += verse;
          if (i < split.length && reference.substring(i).match(`^[${DASHES}][0-9]+[^\\w]*$`)) {
            i++;
            link += "-";
            while (i < split.length && split[i] >= '0' && split[i] <= '9') {
              link += split[i];
              i++;
            }
          }
          link += ("#p" + verse);
        }

        if (node.parentElement) {
          node.parentElement.innerHTML = node.parentElement.innerHTML.replaceAll(str.replaceAll("&", "&amp;"), `<a href="${link}" target="_blank">${str}</a>`);
        }
        else {
          console.error(node + ` has no parent element, link to ${link} found`);
        }
        return true;
      }
    }
  }
  return false;
}

function addLinksRec(node: VisitorNode) {
  if (node.visited) return false;
  if (node.parentElement) {
    if (node.parentElement.tagName === 'A') return false;
    let style = window.getComputedStyle(node.parentElement);
    if (style.display === "none" || style.visibility === "hidden") return false;
  }

  if (node.nodeType == Node.TEXT_NODE) {
    let str: string | null = node.textContent;
    if (!str) return false;
    let split = str.split(new RegExp(SPLIT_REGEX));
    for (let i = 0; i < split.length - 1; i++) {
      console.log(split[i]);
      if (matcher(node, split[i], split[i + 1], SINGLE_MATCHERS)) return true;
      if (i < split.length - 2) {
        let match = new RegExp(split[i] + SPLIT_REGEX + split[i + 1]);
        let start = str.search(match);
        let end = start + split[i].length + split[i + 1].length + 1;
        if (matcher(node, str.substring(start, end), split[i + 2], DOUBLE_MATCHERS)) {
          return true;
        }
      }
      if (i < split.length - 3) {
        let match = split[i] + SPLIT_REGEX + split[i + 1] + SPLIT_REGEX + split[i + 2];
        let start = str.search(match);
        let end = start + split[i].length + split[i + 1].length + split[i + 2].length + 2;
        if (matcher(node, str.substring(start, end), split[i + 3], TRIPLE_MATCHERS)) {
          return true;
        }
      }
    }
  }

  for (const child of node.childNodes) {
    if (addLinksRec(VisitorNode.of
      (child))) {
      addLinksRec(node);
      return false;
    }
  }
}

let observer: MutationObserver | undefined;

function addLinks() {
  disconnectObserver();
  addLinksRec(VisitorNode.of(document.body));
  setUpObserver();
}

function mutate(mutationList: MutationRecord[]) {
  disconnectObserver();
  for (let mutation of mutationList) {
    if (mutation.type == "childList") {
      let addedNodes = mutation.addedNodes;
      for (let node of addedNodes) {
        addLinksRec(VisitorNode.of(node));
      }
    }
    if (mutation.type == "attributes") {
      addLinksRec(VisitorNode.of(mutation.target));
    }
  }
  setUpObserver();
}

function setUpObserver() {
  observer = new MutationObserver(mutate);
  const observerOptions: MutationObserverInit = {
    childList: true,
    subtree: true,
    attributes: true,
  };
  observer.observe(document.body, observerOptions);
}

function disconnectObserver() {
  if (observer) observer.disconnect();
  observer = undefined;
}


// const messageListener = (
//   message: ChromeMessage,
//   sender: chrome.runtime.MessageSender
// ) => {
//   if (sender.id !== chrome.runtime.id) return;
//   switch (message.message) {
//     case MessageType.ADD:
//       addLinks();
//       break;
//     case MessageType.REMOVE:
//       disconnectObserver();
//       window.location.reload();
//       break;
//   }
// };

// function checkUrl(list: string[]): boolean {
//   return list.some((item) => window.location.href.match(".*" + item + ".*"));
// }

// async function main() {
//   let enabledResult = await chrome.storage.local.get([storageAllEnabled]);
//   let enabled: boolean = enabledResult[storageAllEnabled];
//   let list: string = (enabled) ? storageExclusionList : storageInclusionList;
//   let localResult = await chrome.storage.local.get([list]);
//   let present: boolean = checkUrl(localResult[list]);
//   if (present) {
//     let oppList: string = (enabled) ? storageInclusionList : storageExclusionList;
//     let sessionResult = await chrome.storage.session.get([oppList]);
//     present = !checkUrl(sessionResult[oppList]);
//   }
//   else {
//     let sessionResult = await chrome.storage.session.get([list]);
//     present = checkUrl(sessionResult[list]);
//   }

//   if (present !== enabled) addLinks();
// }

// chrome.runtime.onMessage.addListener(messageListener);

// main();

addLinks();
