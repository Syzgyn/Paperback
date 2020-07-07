import axios from "axios";
import React, { Component } from "react";
import ComicItem from "./ComicItem";
import { Search as Searchbar } from "./Search";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import PageRow from "@/Components/Page/PageRow";
import { useDispatch, useSelector } from "react-redux";
import { searchComics, addComicsSelector } from '@/Store/Slices/addComics';

const AddNewComic = () => { 
    const dispatch = useDispatch();
    const {isLoading, isPopulated, items} = useSelector(addComicsSelector);

    function onSearchSubmit(value) {
        if (!!value.trim()) {
            dispatch(searchComics(value));
        }
        return;
    }

    return (
        <>
            <Searchbar searchCallback={onSearchSubmit} />
            <PageRow>
                {isLoading ? (
                <LoadingIndicator />
                ) : (isPopulated ? (
                    <div id="comic-list">
                        {items.map((comic) => (
                            <div
                                className="comic-list-item pb-4"
                                key={comic.cvid}
                            >
                                <ComicItem {...comic} />
                            </div>
                        ))}
                    </div>
                ) : (
                    ""
                ))}
            </PageRow>
        </>
    );
}

export default AddNewComic;
