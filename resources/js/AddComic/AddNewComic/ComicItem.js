import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import DOMPurify from "dompurify";
import Pluralize from "react-pluralize";
import ComicBadge from "@/Components/ComicBadge";
import {
    Plus as PlusIcon,
    Search as SearchIcon,
    Loader as LoaderIcon,
    Check as CheckIcon,
} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
    addComicsSelector,
    addComic,
    addComicAndSearch,
} from "@/Store/Slices/addComics";

const ComicItem = (props) => {
    const dispatch = useDispatch();
    const { isAdding, isAdded } = useSelector(addComicsSelector);
    const {
        cvid,
        numIssues,
        startYear,
        publisher,
        image,
        name,
        displayDescription,
        inLibrary,
        singleView,
        classes,
    } = props;

    useEffect(() => {
        $('[data-toggle="tooltip"]').tooltip();
    });

    function clickAddComic() {
        dispatch(addComic(props.cvid));
    }

    function clickAddAndSearchComic() {
        dispatch(addComicAndSearch(props.cvid));
    }

    return (
        <div className={"row pb-5 " + classes}>
            <div className="col-md-2 col-sm-3">
                <img className="cover-image" src={image} />
            </div>
            <div className="col-md-10 col-sm-9">
                <div className="row">
                    <div className="col-12">
                        <span className="h2 mr-2">
                            {name}{" "}
                            <span className="comic-year">({startYear})</span>
                        </span>
                        {!singleView && publisher ? (
                            <ComicBadge color="secondary">
                                {publisher}
                            </ComicBadge>
                        ) : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div
                            className="comic-description"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(displayDescription, {
                                    ADD_ATTR: ["target"],
                                }),
                            }}
                        ></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <ComicBadge>
                            <Pluralize singular={"issue"} count={numIssues} />
                        </ComicBadge>
                    </div>
                    <div className="col-md-3 offset-md-7">
                        {inLibrary ? (
                            <Link to={"/comic/" + cvid}>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                >
                                    Already in Library
                                </button>
                            </Link>
                        ) : !singleView ? (
                            <div className="btn-group">
                                <button
                                    onClick={clickAddComic}
                                    type="button"
                                    className="btn btn-success"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Add"
                                >
                                    {isAdding ? (
                                        <LoaderIcon />
                                    ) : isAdded ? (
                                        <CheckIcon />
                                    ) : (
                                        <PlusIcon />
                                    )}
                                </button>
                                <button
                                    onClick={clickAddAndSearchComic}
                                    type="button"
                                    className="btn btn-success"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    data-html="true"
                                    title="Add and search<br>for missing issues"
                                >
                                    {isAdding ? (
                                        <LoaderIcon />
                                    ) : isAdded ? (
                                        <CheckIcon />
                                    ) : (
                                        <SearchIcon />
                                    )}
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

ComicItem.propTypes = {
    cvid: PropTypes.number,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    numIssues: PropTypes.number,
    startYear: PropTypes.number,
    publisher: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    displayDescription: PropTypes.string,
    inLibrary: PropTypes.bool,
    singleView: PropTypes.bool,
    classes: PropTypes.string,
    dispatch: PropTypes.func,
};

export default withRouter(ComicItem);
