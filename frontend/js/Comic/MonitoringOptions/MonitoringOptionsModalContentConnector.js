import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { updateComicMonitor } from 'Store/Actions/comicActions';
import MonitoringOptionsModalContent from './MonitoringOptionsModalContent';

function createMapStateToProps() {
  return createSelector(
    (state) => state.comic,
    (comicState) => {
      const {
        isSaving,
        saveError
      } = comicState;

      return {
        isSaving,
        saveError
      };
    }
  );
}

const mapDispatchToProps = {
  dispatchUpdateMonitoringOptions: updateComicMonitor
};

class MonitoringOptionsModalContentConnector extends Component {

  //
  // Lifecycle

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isSaving && !this.props.isSaving && !this.props.saveError) {
      this.props.onModalClose(true);
    }
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.setState({ name, value });
  }

  onSavePress = ({ monitor }) => {
    this.props.dispatchUpdateMonitoringOptions({
      id: this.props.comicId,
      monitor
    });
  }

  //
  // Render

  render() {
    return (
      <MonitoringOptionsModalContent
        {...this.props}
        onInputChange={this.onInputChange}
        onSavePress={this.onSavePress}
      />
    );
  }
}

MonitoringOptionsModalContentConnector.propTypes = {
  comicId: PropTypes.number.isRequired,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  dispatchUpdateMonitoringOptions: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default connect(createMapStateToProps, mapDispatchToProps)(MonitoringOptionsModalContentConnector);