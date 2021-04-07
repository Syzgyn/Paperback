import React from "react";
import PropTypes from "prop-types";
import { Search, Sliders } from "react-feather";
import { UncontrolledPopover, PopoverBody, UncontrolledTooltip } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteComic, searchComic } from "@/Store/Slices/comics";

const ComicSettings = ({ cvid }) => {
    const dispatch = useDispatch();

    function onDeleteClick() {
        dispatch(deleteComic(cvid));
    }

    function onSearchClick() {
        dispatch(searchComic(cvid));
    }

    return (
        <>
            <Search className="cursor-pointer mr-1" id={"search-button-" + cvid} onClick={onSearchClick} />
            <UncontrolledTooltip
                placement="top"
                target={"search-button-" + cvid}
            >
                Search for all monitored issues in this comic
            </UncontrolledTooltip>

            <Sliders className="cursor-pointer mr-1" id={"settings-button-" + cvid} />
            <UncontrolledPopover
                trigger="legacy"
                target={"settings-button-" + cvid}
                placement="bottom"
            >
                <PopoverBody>
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-danger d-block"
                            onClick={onDeleteClick}
                        >
                            Delete
                        </button>
                        <a
                            className="btn btn-secondary d-block"
                            href={"/api/comic/" + cvid + "/comicvine"}
                            target="_blank"
                        >
                            View on ComicVine
                        </a>
                    </div>
                        
                </PopoverBody>
            </UncontrolledPopover>
            <UncontrolledTooltip
                placement="top"
                target={"settings-button-" + cvid}
            >
                Settings
            </UncontrolledTooltip>
        </>
    );
};

ComicSettings.propTypes = {
    cvid: PropTypes.number,
};

export default ComicSettings;
