import axios from 'axios'
import React, { Component } from 'react'
import ComicIndexItem from './ComicIndexItem'
import LoadingIndicator from '@/Components/Loading/LoadingIndicator'
import { Link } from 'react-router-dom'

class ComicList extends Component {
    constructor() {
        super();
        this.state = {
            comics: [],
            isPopulated: false,
        }
    }

    componentDidMount() {
        axios.get('/api/comic/').then(response => {
            this.setState({
                comics: response.data.data,
                isPopulated: true,
            });
        });
    }

    render () {
        const { comics, isPopulated } = this.state;
        if (!isPopulated) {
            return <LoadingIndicator />
        }

        if (!comics.length) {
            return(
            <div className="row">
                <div className="col-md-12">
                    <h3>There are no comics in your library yet.  <Link to='/add/new'>Add some</Link></h3>
                </div>
            </div>
            );
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <div id="comic-list"> 
                        {comics.map(comic => (
                            <ComicIndexItem {...comic} key={comic.cvid} indexView={true}/> 
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default ComicList 
