import React, { Component } from 'react'
import DOMPurify from 'dompurify'

class ComicItem extends Component {
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
                                <span className="h2">{comic.name} <span className="comic-year">({comic.start_year})</span></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="comic-description" 
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(comic.description, { ADD_ATTR: ['target'] })}} >
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <span class="comic-issues badge badge-primary">{comic.num_issues} issues</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ComicItem
