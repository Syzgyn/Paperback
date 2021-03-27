import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import PageHeader from "@/Components/Page/Header/PageHeader";
import PageSidebar from "@/Components/Page/Sidebar/PageSidebar";
import { useDispatch } from "react-redux";
import { fetchComics } from "@/Store/Slices/comics";
import locationShape from "@/Helpers/Props/Shapes/locationShape";
import styles from "./Page.module.scss";

const Page = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        dispatch(fetchComics());
    }, [dispatch]);
    return (
        <div className={props.className}>
            <PageHeader />
            <div className={styles.main}>
                <PageSidebar
                    location={location}
                />
                {props.children}
            </div>
        </div>
    );
};

Page.propTypes = {
    hasError: PropTypes.bool,
    isPopulated: PropTypes.bool,
    children: PropTypes.node,
};

Page.defaultProps = {
    className: styles.page,
}

export default Page;
