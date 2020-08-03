import React from "react";
import ComicIndexItem from "./ComicIndexItem";
import ComicIndexHeader from "@/Comic/Index/ComicIndexHeader";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import PageRow from "@/Components/Page/PageRow";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { comicsSelector, sortedComicsSelector } from "@/Store/Slices/comics";

const ComicIndex = () => {
    const { items: comics, isFetching, isPopulated } = useSelector(
        sortedComicsSelector
    );

    if (isFetching) {
        return <LoadingIndicator />;
    }

    if (!isPopulated && !isFetching) {
        return "Something went wrong";
    }

    if (!comics.length) {
        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3>
                        There are no comics in your library yet.{" "}
                        <Link to="/add/new">Add some</Link>.
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <>
            <ComicIndexHeader />
            <PageRow>
                <div id="comic-list">
                    {comics.map((comic) => (
                        <ComicIndexItem
                            {...comic}
                            key={comic.cvid}
                            indexView={true}
                        />
                    ))}
                </div>
            </PageRow>
        </>
    );
};

export default ComicIndex;
