import axios from 'axios'
import React, { useEffect } from 'react'
import ComicIndexItem from './ComicIndexItem'
import LoadingIndicator from '@/Components/Loading/LoadingIndicator'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {fetchComics, comicsSelector} from '@/Store/Slices/comics'

const ComicIndex = () => { 
    const dispatch = useDispatch();
    const {items: comics, isFetching, isPopulated} = useSelector(comicsSelector);

    if (!isPopulated) {
        return <LoadingIndicator />
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
