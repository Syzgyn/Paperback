import React from "react";
import PropTypes from "prop-types";
import { Badge } from "reactstrap";

function ConnectorBadge(props) {
    const { text, enabled } = props;

    const color = enabled ? "success" : "danger";

    if (enabled === undefined) {
        return null;
    }

    return <Badge color={color}>{text}</Badge>;
}

ConnectorBadge.propTypes = {
    text: PropTypes.string.isRequired,
    enabled: PropTypes.bool,
};

export default ConnectorBadge;
