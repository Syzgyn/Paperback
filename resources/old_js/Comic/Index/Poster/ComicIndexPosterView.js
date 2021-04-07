import React from "react";
import ComicIndexPosterItem from "@/Comic/Index/Poster/ComicIndexPosterItem";

const ComicIndexPosterView = (props) => {
    const comics = props.comics || [];

    return (
        <div className="text-center">
            {comics.map((comic) => (
                <ComicIndexPosterItem
                    {...comic}
                    key={comic.cvid}
                />
            ))}
        </div>
    );
}

export default ComicIndexPosterView;
