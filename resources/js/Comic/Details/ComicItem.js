import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Pluralize from 'react-pluralize'
import ComicBadge from '@/Components/ComicBadge'

class ComicItem extends Component {
    render() {
        const {
                numIssues, 
                startYear,
                publisher,
                image,
                name,
                description,
                classes,
            } = this.props;

        return (
            <div className={"row pb-5 " + classes}>
                <div className="col-md-2 col-sm-3">
                    <img className="cover-image" src={image} />
                </div>
                <div className="col-md-10 col-sm-9">
                    <div className="row">
                        <div className="col-12 pb-1">
                            <span className="h2 mr-2">{name} <span className="comic-year">({startYear})</span></span>
                        </div>
                        <div className="col-12">
                            <div className="comic-description" 
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description, { ADD_ATTR: ['target'] })}} >
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <ComicBadge><Pluralize singular={'issue'} count={numIssues} /></ComicBadge>
                            <ComicBadge>{publisher}</ComicBadge>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ComicItem.propTypes = {
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

export default withRouter(ComicItem);
