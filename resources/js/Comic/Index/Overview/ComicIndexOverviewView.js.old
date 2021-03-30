import React from "react";
import ComicIndexOverviewItem from "@/Comic/Index/Overview/ComicIndexOverviewItem";

const ComicIndexOverviewView = (props) => {
    const comics = props.comics || [];

    return (
        <>
            {comics.map((comic) => (
                <ComicIndexOverviewItem
                    {...comic}
                    key={comic.cvid}
                />
            ))}
        </>
    );
}

export default ComicIndexOverviewView;
