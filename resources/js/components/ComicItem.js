import React, { Component } from 'react'
import DOMPurify from 'dompurify'
import DetectableOverflow from 'react-detectable-overflow';


class ComicItem extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(isOverflowed) {
        console.log(isOverflowed);
    }

    render() {
        const { comic } = this.props;
        return (
            <div className="comic-list-item pb-4"> 
                <div className="row">
                    <div className="col-md-2 col-sm-3">
                        <img className="cover-image" src={comic.image} />
                    </div>
                    <div className="col-md-10 col-sm-9">
                        <div className="row">
                            <div className="col-12">
                                <h2>{comic.name} <span className="comic-year">({comic.start_year})</span></h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="comic-description" 
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(comic.description, { ADD_ATTR: ['target'] })}} >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ComicItem
