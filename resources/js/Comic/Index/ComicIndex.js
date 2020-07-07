import React from 'react'
import ComicIndexItem from './ComicIndexItem'
import LoadingIndicator from '@/Components/Loading/LoadingIndicator'
import { Link } from 'react-router-dom'
import {useSelector } from 'react-redux'
import {comicsSelector} from '@/Store/Slices/comics'

const ComicIndex = () => { 
    const {items: comics, isFetching, isPopulated} = useSelector(comicsSelector);

    if (isFetching) {
        return <LoadingIndicator />
    }

    if (!isPopulated) {
        return "Something went wrong";
    }

    if (!comics.length) {
        return(
        <div className="row">
            <div className="col-md-12 text-center">
                <h3>There are no comics in your library yet.  <Link to='/add/new'>Add some</Link>.</h3>
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

export default ComicIndex 
