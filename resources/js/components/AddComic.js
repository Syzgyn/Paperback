import axios from 'axios'
import React, { Component } from 'react'
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

        await axios.get('/api/comic/search/', {
            params: {
                query: value,
            }
        })
        .then(response => {
            this.setState({comics: response.data.data, loading: false});
        });
    }

    render () {
        const { comics, loading } = this.state;
        console.log(comics);
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
                                <div className="comic-list-item pb-4" key={comic.cvid}> 
                                    <ComicItemTemplate {...comic}/> 
                                </div>
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
