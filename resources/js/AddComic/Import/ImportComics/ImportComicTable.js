import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import ImportComicRow from "@/AddComic/Import/ImportComics/ImportComicRow";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchItems,
    importComicsSelector,
    setAllChecked,
} from "@/Store/Slices/importComics";
import { withRouter } from "react-router-dom";

const ImportComicTable = ({ match }) => {
    const dispatch = useDispatch();
    const folderId = match.params.folderId;
    const { isLoading, items } = useSelector(importComicsSelector);

    useEffect(() => {
        dispatch(fetchItems(folderId));
    }, [dispatch, folderId]);

    function onMasterChange(e) {
        const checked = e.target.checked;
        dispatch(setAllChecked(checked));
    }

    if (isLoading) {
        return <LoadingIndicator />
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            defaultChecked={true}
                            onChange={onMasterChange}
                        />
                    </th>
                    <th>Folder</th>
                    <th>Issue Count</th>
                    <th>Monitor</th>
                    <th>Series</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <ImportComicRow key={index} id={index} {...item} />
                ))}
            </tbody>
        </table>
    );
};

ImportComicTable.propTypes = {
    match: PropTypes.object,
}

export default withRouter(ImportComicTable);
