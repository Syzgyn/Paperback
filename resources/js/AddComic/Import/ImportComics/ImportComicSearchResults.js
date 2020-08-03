import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
    importComicsItemSelectorFactory,
    fetchSearchResults,
    setMatchId,
} from "@/Store/Slices/importComics";
import { useDispatch, useSelector } from "react-redux";

const ImportComicSearchResults = (props) => {
    const dispatch = useDispatch();
    const selector = importComicsItemSelectorFactory(props.id);
    const { isLoading, isPopulated, items } = useSelector(selector);

    useEffect(() => {
        dispatch(fetchSearchResults(props.id));
    }, [dispatch, props.id]);

    function changeMatch(e) {
        dispatch(setMatchId({ id: props.id, matchId: e.target.value }));
    }

    //TODO: Replace with more dynamic dropdown (search, extended limits, etc)
    return (
        <select
            className="custom-select"
            defaultValue="temp"
            onChange={changeMatch}
        >
            {isLoading ? (
                <option disabled value="temp">
                    Loading...
                </option>
            ) : null}
            {isPopulated && items.length == 0 ? (
                <option disabled value="temp">
                    No Matches Found
                </option>
            ) : null}
            {items.map((item) => (
                <option key={item.cvid} value={item.cvid}>
                    {item.name +
                        " (" +
                        item.startYear +
                        ") [" +
                        item.numIssues +
                        " issues] [" +
                        item.publisher +
                        "]"}
                </option>
            ))}
        </select>
    );
};

ImportComicSearchResults.propTypes = {
    id: PropTypes.number,
}

export default ImportComicSearchResults;
