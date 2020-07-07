import React, { useEffect } from "react";
import PropTypes from "prop-types";
import PageHeader from "@/Components/Page/PageHeader";
import { useDispatch } from "react-redux";
import { fetchComics } from "@/Store/Slices/comics";

const Page = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchComics());
    }, [dispatch]);
    return (
        <>
            <PageHeader />
            <div className="page container bg-light rounded-lg py-3 mt-2">
                {props.children}
            </div>
        </>
    );
};

Page.propTypes = {
    hasError: PropTypes.bool,
    isPopulated: PropTypes.bool,
    children: PropTypes.node,
};

export default Page;
