import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import Pluralize from "react-pluralize";
import ComicBadge from "@/Components/ComicBadge";
import ComicItemButtons from "@/AddComic/AddNewComic/ComicItemButtons";

const ComicItem = (props) => {
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
                        <ComicItemButtons cvid={cvid} inLibrary={inLibrary} />
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

export default ComicItem;
