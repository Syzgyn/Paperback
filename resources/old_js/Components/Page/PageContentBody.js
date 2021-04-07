import PropTypes from 'prop-types';
import React from 'react';
//import { isMobile as isMobileUtil } from 'Utilities/mobile';
//import { isLocked } from 'Utilities/scrollLock';
//import { scrollDirections } from 'Helpers/Props';
//import OverlayScroller from 'Components/Scroller/OverlayScroller';
//import Scroller from 'Components/Scroller/Scroller';
import styles from './PageContentBody.module.scss';

const PageContentBody = (props) => (
    <div className={props.className}>
        <div className={props.innerClassName}>
            {props.children}
        </div>
    </div>
);

PageContentBody.propTypes = {
  className: PropTypes.string,
  innerClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  onScroll: PropTypes.func,
  dispatch: PropTypes.func
};

PageContentBody.defaultProps = {
  className: styles.contentBody,
  innerClassName: styles.innerContentBody
};

export default PageContentBody;
