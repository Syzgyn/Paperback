import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'Components/Icon';
import MonitorToggleButton from 'Components/MonitorToggleButton';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import ComicTitleLink from 'Comic/ComicTitleLink';
import SeasonPassSeason from './SeasonPassSeason';
import { getComicStatusDetails } from 'Comic/ComicStatus';
import styles from './SeasonPassRow.css';

class SeasonPassRow extends Component {

  //
  // Render

  render() {
    const {
      comicId,
      monitored,
      status,
      title,
      titleSlug,
      seasons,
      isSaving,
      isSelected,
      onSelectedChange,
      onComicMonitoredPress,
      onSeasonMonitoredPress
    } = this.props;

    const statusDetails = getComicStatusDetails(status);

    return (
      <TableRow>
        <TableSelectCell
          id={comicId}
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
        />

        <TableRowCell className={styles.status}>
          <Icon
            className={styles.statusIcon}
            name={statusDetails.icon}
            title={statusDetails.title}

          />
        </TableRowCell>

        <TableRowCell className={styles.title}>
          <ComicTitleLink
            titleSlug={titleSlug}
            title={title}
          />
        </TableRowCell>

        <TableRowCell className={styles.monitored}>
          <MonitorToggleButton
            monitored={monitored}
            isSaving={isSaving}
            onPress={onComicMonitoredPress}
          />
        </TableRowCell>

        <TableRowCell className={styles.seasons}>
          {
            seasons.map((season) => {
              return (
                <SeasonPassSeason
                  key={season.seasonNumber}
                  {...season}
                  onSeasonMonitoredPress={onSeasonMonitoredPress}
                />
              );
            })
          }
        </TableRowCell>
      </TableRow>
    );
  }
}

SeasonPassRow.propTypes = {
  comicId: PropTypes.number.isRequired,
  monitored: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  seasons: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSaving: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
  onSelectedChange: PropTypes.func.isRequired,
  onComicMonitoredPress: PropTypes.func.isRequired,
  onSeasonMonitoredPress: PropTypes.func.isRequired
};

SeasonPassRow.defaultProps = {
  isSaving: false
};

export default SeasonPassRow;
