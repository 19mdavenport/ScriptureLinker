
interface Props {
  label: string,
  checked: boolean,
  onChange: (value: boolean) => void;
}

export default function LabeledSwitch(props: Props) {
  return (<div style={{display: "inline-block"}}>
    <p>{props.label}</p>
    <label className="switch">
      <input type="checkbox" checked={props.checked} onChange={(event) => props.onChange(event.target.checked)} />
      <span className="slider round"></span>
    </label>
  </div>)
}