import React from "react";
import WantedItem from "@/Wanted/WantedItem";
import { useDispatch, useSelector } from "react-redux";
import {
    selectItem,
    setSortKey,
    wantedIssuesSelector,
} from "@/Store/Slices/wanted";

const WantedList = () => {
    const dispatch = useDispatch();
    const { items, selectedItems } = useSelector(wantedIssuesSelector);

    function getSortClick(key) {
        return function () {
            dispatch(setSortKey(key));
        };
    }

    function selectAll(e) {
        if (e.target.checked) {
            const values = items.map((item) => item.cvid);
            dispatch(selectItem(values));
        } else {
            dispatch(selectItem([]));
        }
    }

    return (
        <table className="table wanted-table">
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" onChange={selectAll} />
                    </th>
                    <th onClick={getSortClick("comic.name")}>Comic Name</th>
                    <th onClick={getSortClick("issue_num")}>Issue</th>
                    <th onClick={getSortClick("name")}>Issue Name</th>
                    <th onClick={getSortClick("release_date")}>Release Date</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <WantedItem
                        {...item}
                        isSelected={selectedItems.indexOf(item.cvid) > -1}
                        key={item.cvid}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default WantedList;
