import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import DOMPurify from 'dompurify'
import Pluralize from 'react-pluralize'
import ComicBadge from './ComicBadge'
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
                description,
                inLibrary,
            } = this.props;

        return (
            <div className="comic-list-item pb-4"> 
                <div className="row">
                    <div className="col-md-2 col-sm-3">
                        <img className="cover-image" src={image} />
                    </div>
                    <div className="col-md-10 col-sm-9">
                        <div className="row">
                            <div className="col-12">
                                <span className="h2 mr-2">{name} <span className="comic-year">({startYear})</span></span>
                                {
                                    publisher ? 
                                    <ComicBadge variation="secondary">
                                        {publisher}
                                    </ComicBadge> : null
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="comic-description" 
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description, { ADD_ATTR: ['target'] })}} >
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
                                    <div className="btn-group">
                                        <button onClick={() => this.addComic()} type="button" className="btn btn-success" data-toggle="tooltip" data-placement="top" title="Add">
                                            {this.state.addLoading ? <LoaderIcon /> : <PlusIcon />}
                                        </button>
                                        <button onClick={() => this.addAndSearchComic()} type="button" className="btn btn-success" data-toggle="tooltip" data-placement="top" data-html="true" title="Add and search<br>for missing issues">
                                            {this.state.searchLoading ? <LoaderIcon /> : <SearchIcon />}
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const ComicItemTemplateWithRouter = withRouter(ComicItemTemplate);
export default ComicItemTemplateWithRouter;
