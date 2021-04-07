import React, { Component } from "react";
import PropTypes from "prop-types";
import HistoryIcon from "./HistoryIcon";
import { UncontrolledTooltip } from "reactstrap";

class HistoryItem extends Component {
    render() {
        const {
            id,
            source_title,
            date_elapsed,
            display_date,
        } = this.props.item;

        return (
            <tr>
                <td>
                    <HistoryIcon {...this.props.item} />
                </td>
                <td>{source_title}</td>
                <td>
                    <span id={"history-date-" + id}>{date_elapsed}</span>
                </td>
                <UncontrolledTooltip
                    placement="left"
                    target={"history-date-" + id}
                >
                    {display_date}
                </UncontrolledTooltip>
            </tr>
        );
    }
}

HistoryItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        source_title: PropTypes.string,
        date_elapsed: PropTypes.string,
        display_date: PropTypes.string,
    }),
};

export default HistoryItem;
