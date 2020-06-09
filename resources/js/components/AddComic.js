import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ComicItemTemplate from './ComicItemTemplate';
import { Search as Searchbar } from './AddComic/Search';

class AddComic extends Component {
    constructor() {
        super();
        this.state = {
            searchValue: "",
            loading: false,
            comics: [],
        }

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    onSearchSubmit(value) {
        console.log(value);
        const hasValue = !!value.trim();
        this.setState({searchValue: value}, () => {
            if (hasValue) {
                this.search(value);
            }
        });
    }

    async search(value) {
        this.setState({loading: true});

        await axios.get('/api/comic/search/' + value).then(response => {
            this.setState({comics: response.data.data, loading: false});
        });
    }

    render () {
        const { comics, loading } = this.state;
        return (
        <>
            <Searchbar onSubmit={this.onSearchSubmit} />
            <div className="row">
                <div className="col-12">
                    {
                        loading ? 
                        <span>Loading...</span> :
                        comics ?
                        <div id="comic-list"> 
                            {comics.map(comic => (
                                <ComicItemTemplate key={comic.cvid} {...comic}/> 
                            ))}
                        </div> :
                        ""
                    }
                </div>
            </div>
        </>
        );
    }
}

export default AddComic 
