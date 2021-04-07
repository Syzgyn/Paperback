import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons } from "@/Helpers/Props";
import Icon from "@/Components/Icon";
import styles from "./SeriesSearchInput.module.scss";

const SeriesSearchInput = (props) => {
    return (
        <div className={styles.wrapper}>
            <Icon name={icons.SEARCH} />
        </div>
    );
}

export default SeriesSearchInput;
