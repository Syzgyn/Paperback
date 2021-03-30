import PropTypes from 'prop-types';
import React from 'react';
//import DocumentTitle from 'react-document-title';
//import ErrorBoundary from 'Components/Error/ErrorBoundary';
import PageContentError from '@/Components/Page/PageContentError';
import styles from './PageContent.module.scss';

const PageContent = (props) => {
  const {
    className,
    title,
    children
  } = props;

  return (
    //<ErrorBoundary errorComponent={PageContentError}>
    //  <DocumentTitle title={title ? `${title} - Sonarr` : 'Sonarr'}>
        <div className={className}>
          {children}
        </div>
    //  </DocumentTitle>
    //</ErrorBoundary>
  );
}

PageContent.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

PageContent.defaultProps = {
  className: styles.content
};

export default PageContent;
