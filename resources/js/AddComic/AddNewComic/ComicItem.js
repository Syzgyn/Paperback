import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import DOMPurify from 'dompurify'
import Pluralize from 'react-pluralize'
import ComicBadge from '@/Components/ComicBadge'
import { Plus as PlusIcon, Search as SearchIcon, Loader as LoaderIcon } from 'react-feather'

class ComicItemTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addLoading: false,
            searchLoading: false,
        }
        this.addComic = this.addComic.bind(this);
        this.addAndSearchComic = this.addAndSearchComic.bind(this);
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    addComic() {
        this.setState({
            addLoading: true,
        });

        axios.post('/api/comic/', {
            cvid: this.props.cvid,
        }).then(response => {
            this.setState({
                addLoading: false,
            });
            this.props.history.push("/comic/" + response.data.data.cvid); 
        });
    }

    addAndSearchComic() {
        this.setState({
            searchLoading: true,
        });

        axios.post('/api/comic/', {
            cvid: this.props.cvid,
            search: true,
        }).then(response => {
            this.setState({
                searchLoading: false,
            });
            this.props.history.push("/comic/" + response.data.data.cvid); 
        });
    }

    render() {
        const { cvid, 
                numIssues, 
                startYear,
                publisher,
                image,
                name,
                displayDescription,
                inLibrary,
                singleView,
                classes,
            } = this.props;

        return (
            <div className={"row pb-5 " + classes}>
                <div className="col-md-2 col-sm-3">
                    <img className="cover-image" src={image} />
                </div>
                <div className="col-md-10 col-sm-9">
                    <div className="row">
                        <div className="col-12">
                            <span className="h2 mr-2">{name} <span className="comic-year">({startYear})</span></span>
                            {
                                (!singleView && publisher) ? 
                                <ComicBadge color="secondary">
                                    {publisher}
                                </ComicBadge> : null
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="comic-description" 
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(displayDescription, { ADD_ATTR: ['target'] })}} >
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <ComicBadge><Pluralize singular={'issue'} count={numIssues} /></ComicBadge>
                        </div>
                        <div className="col-md-3 offset-md-7">
                            {
                                inLibrary ? 
                                <Link to={"/comic/" + cvid}>
                                    <button type="button" className="btn btn-outline-secondary">
                                        Already in Library
                                    </button>
                                </Link> : 
                                !singleView ? 
                                <div className="btn-group">
                                    <button onClick={() => this.addComic()} type="button" className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Add">
                                        {this.state.addLoading ? <LoaderIcon /> : <PlusIcon />}
                                    </button>
                                    <button onClick={() => this.addAndSearchComic()} type="button" className="btn btn-success" data-toggle="tooltip" data-placement="top" data-html="true" title="Add and search<br>for missing issues">
                                        {this.state.searchLoading ? <LoaderIcon /> : <SearchIcon />}
                                    </button>
                                </div> :
                                ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ComicItemTemplate.propTypes = {
    cvid: PropTypes.number,
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
    numIssues: PropTypes.number,
    startYear: PropTypes.number,
    publisher: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    inLibrary: PropTypes.bool,
    singleView: PropTypes.bool,
    classes: PropTypes.string,
}

export default withRouter(ComicItemTemplate);
