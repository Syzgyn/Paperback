import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCheckedItems, importSelectedDirs, importComicsCheckedCountSelector } from "@/Store/Slices/importComics";

const ImportComicFooter = (props) => {
    const dispatch = useDispatch();
    const count = useSelector(importComicsCheckedCountSelector); 

    function importComics(e) {
        e.preventDefault();
        dispatch(importSelectedDirs());
    }

    return (
        <div>
            <button disabled={props.checkedCount == 0} className="btn btn-primary" onClick={importComics} >Import {count} Comics</button>
        </div>
    );
};

export default ImportComicFooter;
