import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { currentComicSelector, deleteComic } from '@/Store/Slices/comics';
import DeleteComicModalContent from './DeleteComicModalContent';

function createMapStateToProps() {
  return createSelector(
    createComicSelector(),
    (comic) => {
      return comic;
    }
  );
}

const mapDispatchToProps = {
  deleteComic
};

class DeleteComicModalContentConnector extends Component {

  //
  // Listeners

  onDeletePress(deleteFiles, addImportListExclusion) {
    this.props.deleteComic({
      id: this.props.comicId,
      deleteFiles,
      addImportListExclusion
    });

    this.props.onModalClose(true);
  }

  //
  // Render

  render() {
    return (
      <DeleteComicModalContent
        {...this.props}
        onDeletePress={this.onDeletePress}
      />
    );
  }
}

DeleteComicModalContentConnector.propTypes = {
  comicId: PropTypes.number.isRequired,
  onModalClose: PropTypes.func.isRequired,
  deleteComic: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(DeleteComicModalContentConnector);
