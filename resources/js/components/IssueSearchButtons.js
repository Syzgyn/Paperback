import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Search, User } from 'react-feather'
import {UncontrolledTooltip} from 'reactstrap'

class IssueSearchButtons extends Component
{
    render()
    {
        let {cvid} = this.props;

        return (
            <>
                <Search id={"btn-auto-" + cvid} />
                <User id={"btn-manual-" + cvid} />
                <UncontrolledTooltip placement="top" target={"btn-auto-" + cvid}>
                    Automatic Search
                </UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target={"btn-manual-" + cvid}>
                    Manual Search
                </UncontrolledTooltip>
            </>
        );
    }
}

IssueSearchButtons.propTypes = {
    cvid: PropTypes.number.isRequired
}

export default IssueSearchButtons
