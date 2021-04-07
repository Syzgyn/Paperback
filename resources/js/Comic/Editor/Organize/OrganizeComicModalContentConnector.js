import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createAllComicSelector from 'Store/Selectors/createAllComicSelector';
import { executeCommand } from 'Store/Actions/commandActions';
import * as commandNames from 'Commands/commandNames';
import OrganizeComicModalContent from './OrganizeComicModalContent';

function createMapStateToProps() {
  return createSelector(
    (state, { comicIds }) => comicIds,
    createAllComicSelector(),
    (comicIds, allComic) => {
      const comic = _.intersectionWith(allComic, comicIds, (s, id) => {
        return s.id === id;
      });

      const sortedComic = _.orderBy(comic, 'sortTitle');
      const comicTitles = _.map(sortedComic, 'title');

      return {
        comicTitles
      };
    }
  );
}

const mapDispatchToProps = {
  executeCommand
};

class OrganizeComicModalContentConnector extends Component {

  //
  // Listeners

  onOrganizeComicPress() {
    this.props.executeCommand({
      name: commandNames.RENAME_SERIES,
      comicIds: this.props.comicIds
    });

    this.props.onModalClose(true);
  }

  //
  // Render

  render(props) {
    return (
      <OrganizeComicModalContent
        {...this.props}
        onOrganizeComicPress={this.onOrganizeComicPress}
      />
    );
  }
}

OrganizeComicModalContentConnector.propTypes = {
  comicIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  onModalClose: PropTypes.func.isRequired,
  executeCommand: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(OrganizeComicModalContentConnector);
