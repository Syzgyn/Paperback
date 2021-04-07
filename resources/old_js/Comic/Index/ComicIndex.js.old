import React from "react";
import ComicIndexOverviewView from "@/Comic/Index/Overview/ComicIndexOverviewView";
import ComicIndexPosterView from "@/Comic/Index/Poster/ComicIndexPosterView";
import ComicIndexTableView from "@/Comic/Index/Table/ComicIndexTableView";
import ComicIndexHeader from "@/Comic/Index/ComicIndexHeader";
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import PageRow from "@/Components/Page/PageRow";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { sortedComicsSelector } from "@/Store/Slices/comics";

const ComicIndex = () => {
    const { items: comics, isLoading, isPopulated, view } = useSelector(
        sortedComicsSelector
    );

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (!isPopulated && !isLoading) {
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

    function getViewComponent(view) {
        if (view == "overview") {
            return ComicIndexOverviewView;
        }

        if (view == "posters") {
            return ComicIndexPosterView;
        }

        return ComicIndexTableView;
    }

    const ViewComponent = getViewComponent(view);

    return (
        <>
            <ComicIndexHeader />
            <PageRow>
                <div id="comic-list">
                    <ViewComponent comics={comics} />
                </div>
            </PageRow>
        </>
    );
};

export default ComicIndex;
