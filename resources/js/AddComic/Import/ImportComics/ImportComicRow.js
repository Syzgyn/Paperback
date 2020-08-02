import React, { useEffect } from "react";
import ImportComicSearchResults from "@/AddComic/Import/ImportComics/ImportComicSearchResults";
import { useDispatch, useSelector } from "react-redux";
import { toggleCheckbox, setMonitored} from "@/Store/Slices/importComics";

const ImportTableRow = (props) => {
    const dispatch = useDispatch();

    function toggleChecked() {
        dispatch(toggleCheckbox(props.id));
    }

    function changeMonitor(e) {
        dispatch(setMonitored({id: props.id, monitored: e.target.value}));
    }

    return (
        <tr>
            <td><input type="checkbox" checked={props.checked} disabled={props.items.length == 0} onChange={toggleChecked} /></td>
            <td>{props.name}</td>
            <td>{props.comicCount}</td>
            <td>
                <select defaultValue="all" className="custom-select" onChange={changeMonitor} >
                    <option value="all">All Issues</option>
                    <option value="future">Future Issues</option>
                    <option value="missing">Missing Issues</option>
                    <option value="existing">Existing Issues</option>
                    <option value="none">None</option>
                </select>
            </td>
            <td>
                <ImportComicSearchResults id={props.id} />
            </td>
        </tr>
    )
}

export default ImportTableRow;
