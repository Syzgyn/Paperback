import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setComicSort } from "@/Store/Slices/comics";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

const ComicIndexHeader = () => {
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    function setSort(e) {
        dispatch(setComicSort(e.target.value));
    }

    return (
        <div className="row justify-content-end text-right pb-4">
            <div className="col-md-3">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>Sort Comics</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem value="sortName" onClick={setSort}>
                            Title
                        </DropdownItem>
                        <DropdownItem value="numIssues" onClick={setSort}>
                            Issues
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};

export default ComicIndexHeader;
