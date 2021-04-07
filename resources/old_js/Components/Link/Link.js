import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Link.module.scss';

const Link = (props) => {
    const onClick = (e) => {
        const {
            isDisabled,
            onPress
        } = props;

        if (!isDisabled && onPress) {
            onPress(e);
        }
    }

    const {
        className,
        component,
        to,
        target,
        isDisabled,
        noRouter,
        onPress,
        ...otherProps
    } = props;

    const linkProps = { target };
    let el = component;

    if (to) {
        if ((/\w+?:\/\//).test(to)) {
            el = 'a';
            linkProps.href = to;
            linkProps.target = target || '_blank';
        } else if (noRouter) {
            el = 'a';
            linkProps.href = to;
            linkProps.target = target || '_self';
        } else {
            el = RouterLink;
            linkProps.to = to;//`${window.Sonarr.urlBase}/${to.replace(/^\//, '')}`;
            linkProps.target = target;
        }
    }

    if (el === 'button' || el === 'input') {
        linkProps.type = otherProps.type || 'button';
        linkProps.disabled = isDisabled;
    }

    linkProps.className = classNames(
        className,
        styles.link,
        to && styles.to,
        isDisabled && 'isDisabled'
    );

    const returnProps = {
        ...otherProps,
        ...linkProps
    };

    returnProps.onClick = onClick;

    return (
        React.createElement(el, returnProps)
   );
}

Link.propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    to: PropTypes.string,
    target: PropTypes.string,
    isDisabled: PropTypes.bool,
    noRouter: PropTypes.bool,
    onPress: PropTypes.func
};

Link.defaultProps = {
    component: 'button',
    noRouter: false
};

export default Link;
