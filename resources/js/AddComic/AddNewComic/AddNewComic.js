import React, { useEffect } from "react";
import ComicItem from "./ComicItem";
import { Search as Searchbar } from "./Search";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import PageRow from "@/Components/Page/PageRow";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    searchComics,
    addComicsSelector,
    clearAddComics,
} from "@/Store/Slices/addComics";

const AddNewComic = () => {
    const dispatch = useDispatch();
    const { isLoading, isPopulated, items } = useSelector(addComicsSelector);

    useEffect(() => {
        return () => {
            dispatch(clearAddComics());
        };
    }, [dispatch]);

    function onSearchSubmit(value) {
        dispatch(searchComics(value));
    }

    return (
        <>
            <Link to="/add/import" className="btn btn-secondary">
                Import
            </Link>
            <Searchbar searchCallback={onSearchSubmit} />
            <PageRow>
                {isLoading ? (
                    <LoadingIndicator />
                ) : isPopulated ? (
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
                )}
            </PageRow>
        </>
    );
};

export default AddNewComic;
