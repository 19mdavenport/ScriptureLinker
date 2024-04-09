
interface Props {
  item: string,
  index: number,
  onDelete: (index: number) => void
}

export default function ListItem(props: Props) {
  function onClick() {
    props.onDelete(props.index)
  }

  console.log(props.item);

  return (
    <tr>
      <td>{props.item}</td>
      <td><button onClick={onClick}>✗</button></td>
    </tr>
  )
}