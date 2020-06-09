import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ComicItem from './ComicItem';
import ComicItemTemplate from './ComicItemTemplate';

class ComicList extends Component {
    constructor() {
        super();
        this.state = {
            comics: []
        }
    }

    componentDidMount() {
        axios.get('/api/comic/search/transmetropolitan').then(response => {
            this.setState({
                comics: response.data.data
            });
        });
    }

    render () {
        const { comics } = this.state;
        return (
        <div className="row">
            <div className="col-md-12">
                <div id="comic-list"> 
                    {comics.map(comic => (
                        <ComicItemTemplate comic={comic} key={comic.cvid}/> 
                    ))}
                </div>
            </div>
        </div>
        );
    }
}

export default ComicList 
