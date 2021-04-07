import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, wantedIssuesSelector } from "@/Store/Slices/wanted";
import { SkipBack, SkipForward, FastForward, Rewind } from "react-feather";

const WantedPageControls = () => {
    const dispatch = useDispatch();
    const { page, totalPages } = useSelector(wantedIssuesSelector);

    return (
        <div className="row justify-content-center">
            <div className="col-2">
                <SkipBack
                    className="pagination-control"
                    onClick={() => dispatch(setPage(1))}
                />
                <Rewind
                    className="pagination-control"
                    onClick={() => dispatch(setPage(Math.max(page - 1, 1)))}
                />
                {page} of {totalPages}
                <FastForward
                    className="pagination-control"
                    onClick={() =>
                        dispatch(setPage(Math.min(page + 1, totalPages)))
                    }
                />
                <SkipForward
                    className="pagination-control"
                    onClick={() => dispatch(setPage(totalPages))}
                />
            </div>
        </div>
    );
};

export default WantedPageControls;
