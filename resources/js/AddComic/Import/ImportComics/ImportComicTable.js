import React, { useEffect, useState } from "react";
import PageRow from "@/Components/Page/PageRow";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import { useDispatch } from "react-redux";
import { fetchItems, importComicsSelector } from "@/Store/Slices/importComics";
import { withRouter } from "react-router-dom";

const ImportComicTable = ({match}) => {
    const dispatch = useDispatch();
    const folderId = match.params.folderId;

    useEffect(() => {
        dispatch(fetchItems(folderId));
    }, [dispatch, folderId]);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Checkbox</th>
                    <th>Folder</th>
                    <th>Monitor</th>
                    <th>Series</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    );
}

export default withRouter(ImportComicTable);
