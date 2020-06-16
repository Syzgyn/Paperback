import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap';
import PageRow from '@/Components/Page/PageRow'

class SearchTab extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            triggerEvent: this.props.triggerEvent,
        };

        this.onManualClick = this.onManualClick.bind(this);
        this.onAutomaticClick = this.onAutomaticClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("state", prevState, this.state, "props", prevProps, this.props);
        if(prevProps.triggerEvent !== this.props.triggerEvent) {
            this.setState({triggerEvent: this.props.triggerEvent});
        }
    }

    onManualClick() {
        this.setState({triggerEvent: "manual"});
    }

    onAutomaticClick() {
        this.setState({triggerEvent: "automatic"});
    }

    defaultButtons() {
        return (
            <>
                <Button onClick={this.onAutomaticClick} color="secondary">Automatic Search</Button>
                <Button onClick={this.onManualClick} color="primary">Manual Search</Button>
            </>
        )
    }

    results() {
        return this.props.triggerEvent;
    }

    render()
    {
        const {triggerEvent} = this.state;
        console.log(this.state);

        return (
            <PageRow>
                {! triggerEvent ? this.defaultButtons() : this.results() }
            </PageRow>
        );
    }
}

export default SearchTab
