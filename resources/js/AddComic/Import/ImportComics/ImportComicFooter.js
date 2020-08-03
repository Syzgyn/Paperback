import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    importSelectedDirs,
    importComicsCheckedCountSelector,
} from "@/Store/Slices/importComics";

const ImportComicFooter = (props) => {
    const dispatch = useDispatch();
    const count = useSelector(importComicsCheckedCountSelector);

    function importComics(e) {
        e.preventDefault();
        dispatch(importSelectedDirs());
    }

    return (
        <div>
            <button
                disabled={props.checkedCount == 0}
                className="btn btn-primary"
                onClick={importComics}
            >
                Import {count} Comics
            </button>
        </div>
    );
};

ImportComicFooter.propTypes = {
    checkedCount: PropTypes.number,
}

export default ImportComicFooter;
