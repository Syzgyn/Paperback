import React from "react";
import ComicIndexTableItem from "@/Comic/Index/Table/ComicIndexTableItem";

const ComicIndexTableView = (props) => {
    const comics = props.comics || [];
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Issues</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {comics.map((comic) => (
                <ComicIndexTableItem {...comic} key={comic.cvid} />
            ))}
            </tbody>
        </table>
    );
}

export default ComicIndexTableView;
