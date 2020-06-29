import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import {Bookmark} from 'react-feather'
import {Spinner} from 'reactstrap'
import {UncontrolledTooltip} from 'reactstrap'


class MonitoredIcon extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isMonitored: props.isMonitored,
            isLoading: false,
        }

        this.onIconClick = this.onIconClick.bind(this);
    }

    onIconClick()
    {
        this.setState({isLoading: true});
        const {itemType, cvid} = this.props;
        axios.put('/api/' + itemType + '/' + cvid, {monitored: !this.state.isMonitored})
            .then(response => {
                this.setState({isMonitored: response.data.data.monitored, isLoading: false})
            });
    }

    render()
    {
        if (this.state.isLoading) {
            return <Spinner size='sm' color='secondary' />
        }

        let fill = this.state.isMonitored ? 'solid' : 'none';
        const id = this.props.itemType + '-' + this.props.cvid;
        let text = "Toggle Monitored Status";
        if (this.props.itemType == 'comic') {
            text += " for all Issues";
        }
        return (
            <>
                <Bookmark fill={fill} onClick={this.onIconClick} id={id} />
                <UncontrolledTooltip placement="top" target={id}>
                    {text}
                </UncontrolledTooltip>
            </>
        );
    }
}

MonitoredIcon.propTypes = {
    itemType: PropTypes.string.isRequired,
    cvid: PropTypes.number.isRequired,
    isMonitored: PropTypes.bool.isRequired,
}

export default MonitoredIcon;
