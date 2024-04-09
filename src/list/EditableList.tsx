import ListItem from "./ListItem";

interface Props {
    list: string[],
    onEdit: (list: string[]) => void;
}

export default function EditableList(props: Props) {
    function onDelete(index: number) {
        let edited = [...props.list];
        edited.splice(index, 1);
        props.onEdit(edited);
    }

    function add() {
        let url = (document.getElementById("newitem") as HTMLInputElement).value;
        let edited = [...props.list];
        edited.push(url);
        edited.sort();
        props.onEdit(edited);
    }

    return (<div style={{ overflowY: 'scroll', minWidth: "200px" }}>
        <table>
            <tr>
                <th>URL</th>
                <th>edit</th>
            </tr>
            {props.list.sort().map((value, index) => {
                return <ListItem item={value} index={index} onDelete={onDelete} />
            })}
            <tr>
                <td>
                    <input style={{ width: "100%" }} id="newitem" type="url" />
                </td>
                <td>
                    <button onClick={add}>✓</button>
                </td>
            </tr>
        </table>
    </div >)
}