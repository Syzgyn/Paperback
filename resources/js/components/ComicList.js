import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ComicItem from './ComicItem';

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
            <div id="comic-list"> 
                {comics.map(comic => (
                    <ComicItem comic={comic} key={comic.cvid}/> 
                ))}
            </div>
        );
    }
}

export default ComicList 
