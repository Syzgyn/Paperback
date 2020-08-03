import React, { useState } from "react";
import PageRow from "@/Components/Page/PageRow";
import FileBrowserModal from "@/Components/FileBrowserModal/FileBrowserModal";
import ImportDirectoryTable from "@/AddComic/Import/ImportDirectoryTable";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/Store/Slices/rootFolders";
import { setCurrentPath, pathsSelector } from "@/Store/Slices/paths";

const Import = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const { currentPath } = useSelector(pathsSelector);

    function toggleModal() {
        setModal(!modal);
    }

    function onSelect() {
        dispatch(addItem(currentPath));
        dispatch(setCurrentPath(""));
    }

    return (
        <PageRow>
            <h1 className="text-center">Import existing Comics</h1>
            <ImportDirectoryTable />
            <button className="btn btn-primary" onClick={toggleModal}>
                Add Folder
            </button>
            <FileBrowserModal
                modal={modal}
                toggleModal={toggleModal}
                onSelectClick={onSelect}
            />
        </PageRow>
    );
};

export default Import;
