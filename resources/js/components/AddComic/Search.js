import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Search as SearchIcon } from 'react-feather';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            value: "",
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onValueChange(event) {
        this.setState({value: event.target.value});
    }

    onFormSubmit(event) {
        event.preventDefault();

        const callback = this.props.onSubmit;
        callback(this.state.value);
    }

    render () {
        return (
        <div className="row mb-5">
            <div className="col-12">
                <form onSubmit={this.onFormSubmit}>
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="text"
                            autoComplete="off"
                            spellCheck="false"
                            placeholder="Search for a Comic series"
                            aria-label="Search"
                            value={this.state.value}
                            onChange={this.onValueChange}
                        />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-secondary">
                                <SearchIcon className="search-button" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        );
    }
}

Search.propTypes = {
    onSubmit: PropTypes.requiredFunc
}

export { Search }; 
