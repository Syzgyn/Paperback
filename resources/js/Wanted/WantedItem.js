import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectItem } from "@/Store/Slices/wanted";

const WantedItem = (props) => {
    const dispatch = useDispatch();
    return (
        <tr>
            <td className="wanted-checkbox-cell">
                <input
                    type="checkbox"
                    onChange={() => dispatch(selectItem(props.cvid))}
                    checked={props.isSelected}
                />
            </td>
            <td className="wanted-comic-cell">
                <Link to={"/comic/" + props.comic_id}>{props.comic_name}</Link>
            </td>
            <td className="wanted-issue-num-cell">{props.issue_num}</td>
            <td className="wanted-issue-name-cell">{props.issue_name}</td>
            <td className="wanted-date-cell">{props.release_date}</td>
        </tr>
    );
};

WantedItem.propTypes = {
    cvid: PropTypes.integer,
    isSelected: PropTypes.bool,
    comic_id: PropTypes.integer,
    comic_name: PropTypes.string,
    issue_num: PropTypes.integer,
    issue_name: PropTypes.string,
    release_date: PropTypes.string,
};

export default WantedItem;
