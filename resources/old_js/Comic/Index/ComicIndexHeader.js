import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setComicSort, setComicView } from "@/Store/Slices/comics";
import { Eye } from "react-feather";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

const ComicIndexHeader = () => {
    const dispatch = useDispatch();
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const [viewDropdownOpen, setViewDropdownOpen] = useState(false);

    const toggleSort = () => setSortDropdownOpen((prevState) => !prevState);
    const toggleView = () => setViewDropdownOpen((prevState) => !prevState);

    function setSort(e) {
        dispatch(setComicSort(e.target.value));
    }

    function setView(e) {
        dispatch(setComicView(e.target.value));
    }

    return (
        <div className="row justify-content-end text-right pb-4">
            <div className="col-md-3">
                <Dropdown isOpen={viewDropdownOpen} toggle={toggleView} className="d-inline mr-2">
                    <DropdownToggle caret><Eye /></DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem value="overview" onClick={setView}>
                            Overview
                        </DropdownItem>
                        <DropdownItem value="posters" onClick={setView}>
                            Posters
                        </DropdownItem>
                        <DropdownItem value="table" onClick={setView}>
                            Table
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown isOpen={sortDropdownOpen} toggle={toggleSort} className="d-inline">
                    <DropdownToggle caret>Sort Comics</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem value="sortName" onClick={setSort}>
                            Title
                        </DropdownItem>
                        <DropdownItem value="downloadedIssues" onClick={setSort}>
                            Issues
                        </DropdownItem>
                        <DropdownItem value="numIssues" onClick={setSort}>
                            Issue Count
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};

export default ComicIndexHeader;
