import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearPendingChanges } from 'Store/Actions/baseActions';
import MonitoringOptionsModal from './EditComicModal';

const mapDispatchToProps = {
  clearPendingChanges
};

class MonitoringOptionsModalConnector extends Component {

  //
  // Listeners

  onModalClose = () => {
    this.props.clearPendingChanges({ section: 'comic' });
    this.props.onModalClose();
  }

  //
  // Render

  render() {
    return (
      <MonitoringOptionsModal
        {...this.props}
        onModalClose={this.onModalClose}
      />
    );
  }
}

MonitoringOptionsModalConnector.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  clearPendingChanges: PropTypes.func.isRequired
};

export default connect(undefined, mapDispatchToProps)(MonitoringOptionsModalConnector);
