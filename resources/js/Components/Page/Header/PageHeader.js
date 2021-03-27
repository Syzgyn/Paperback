import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SeriesSearchInput from "@/Components/Page/Header/SeriesSearchInput";
import styles from "./PageHeader.module.scss";

const PageSidebarItem = (props) => (
    <div className={styles.header}>
        <div className={styles.logoContainer}>
            <Link
                className={styles.logoLink}
                to={'/'}
            >
                <img src="/storage/logo.png" className={styles.logo} />
            </Link>
        </div>

        <SeriesSearchInput />

        <div className={styles.sidebarToggleContainer}>
        </div>
    </div>
);

export default PageSidebarItem;
