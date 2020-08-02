import React, { useEffect } from "react";
import PageRow from "@/Components/Page/PageRow";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import ImportComicRow from "@/AddComic/Import/ImportComics/ImportComicRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, importComicsSelector, setAllChecked } from "@/Store/Slices/importComics";
import { withRouter } from "react-router-dom";

const ImportComicTable = ({match}) => {
    const dispatch = useDispatch();
    const folderId = match.params.folderId;
    const { isLoading, isPopulated, items } = useSelector(importComicsSelector);

    useEffect(() => {
        dispatch(fetchItems(folderId));
    }, [dispatch, folderId]);

    function onMasterChange(e) {
        const checked = e.target.checked;
        dispatch(setAllChecked(checked));
    }
    
    return (
        <table className="table">
            <thead>
                <tr>
                    <th><input type="checkbox" defaultChecked={true} onChange={onMasterChange} /></th>
                    <th>Folder</th>
                    <th>Issue Count</th>
                    <th>Monitor</th>
                    <th>Series</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => 
                    <ImportComicRow key={index} id={index} {...item} />
                )}
            </tbody>
        </table>
    );
}

export default withRouter(ImportComicTable);
