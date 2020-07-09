import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Plus as PlusIcon, Search as SearchIcon } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
    addComicsSelector,
    addComic,
    addComicAndSearch,
} from "@/Store/Slices/addComics";
import { comicsSelector } from "@/Store/Slices/comics";

const ComicItemButtons = (props) => {
    const dispatch = useDispatch();
    const { isAdding } = useSelector(addComicsSelector);
    const comics = useSelector(comicsSelector);
    const { cvid } = props;

    const inLibrary =
        comics.items.findIndex((comic) => comic.cvid == cvid) > -1;

    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip();
        return () => {
            $('[data-toggle="tooltip"]').tooltip("hide");
        };
    });

    function clickAddComic() {
        dispatch(addComic(props.cvid));
    }

    function clickAddAndSearchComic() {
        dispatch(addComicAndSearch(props.cvid));
    }

    if (inLibrary) {
        return (
            <Link to={"/comic/" + cvid}>
                <button type="button" className="btn btn-outline-secondary">
                    Already in Library
                </button>
            </Link>
        );
    }

    return (
        <>
            <div className="btn-group">
                <button
                    onClick={clickAddComic}
                    type="button"
                    className="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add"
                    disabled={isAdding}
                >
                    <PlusIcon />
                </button>
                <button
                    onClick={clickAddAndSearchComic}
                    type="button"
                    className="btn btn-success"
                    data-toggle="tooltip"
                    data-placement="top"
                    data-html="true"
                    title="Add and search<br>for missing issues"
                    disabled={isAdding}
                >
                    <SearchIcon />
                </button>
            </div>
        </>
    );
};

ComicItemButtons.propTypes = {
    cvid: PropTypes.number,
    inLibrary: PropTypes.bool,
};

export default ComicItemButtons;
