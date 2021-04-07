import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearPendingChanges } from '@/Store/Slices/comics';
import EditComicModal from './EditComicModal';

const mapDispatchToProps = {
  clearPendingChanges
};

class EditComicModalConnector extends Component {

  //
  // Listeners

  onModalClose() {
    this.props.clearPendingChanges();
    this.props.onModalClose();
  }

  //
  // Render

  render() {
    return (
      <EditComicModal
        {...this.props}
        onModalClose={this.onModalClose}
      />
    );
  }
}

EditComicModalConnector.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  clearPendingChanges: PropTypes.func.isRequired
};

export default connect(undefined, mapDispatchToProps)(EditComicModalConnector);
