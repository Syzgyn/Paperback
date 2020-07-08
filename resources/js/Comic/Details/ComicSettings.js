import React from "react";
import PropTypes from "prop-types";
import { Sliders } from "react-feather";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteComic } from "@/Store/Slices/comics";

const ComicSettings = ({ cvid }) => {
    const dispatch = useDispatch();

    function onDeleteClick() {
        dispatch(deleteComic(cvid));
    }

    return (
        <>
            <Sliders id="comicSettingsButton" />
            <UncontrolledPopover
                trigger="legacy"
                target="comicSettingsButton"
                placement="bottom"
            >
                <PopoverBody>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={onDeleteClick}
                    >
                        Delete
                    </button>
                </PopoverBody>
            </UncontrolledPopover>
        </>
    );
};

ComicSettings.propTypes = {
    cvid: PropTypes.number,
};

export default ComicSettings;
