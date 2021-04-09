import PropTypes from 'prop-types';
import React from 'react';
import { icons, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Popover from 'Components/Tooltip/Popover';
import VirtualTableHeader from 'Components/Table/VirtualTableHeader';
import VirtualTableHeaderCell from 'Components/Table/VirtualTableHeaderCell';
import VirtualTableSelectAllHeaderCell from 'Components/Table/VirtualTableSelectAllHeaderCell';
import ComicMonitoringOptionsPopoverContent from 'AddComic/ComicMonitoringOptionsPopoverContent';
import ComicTypePopoverContent from 'AddComic/ComicTypePopoverContent';
import styles from './ImportComicHeader.css';

function ImportComicHeader(props) {
  const {
    showLanguageProfile,
    allSelected,
    allUnselected,
    onSelectAllChange
  } = props;

  return (
    <VirtualTableHeader>
      <VirtualTableSelectAllHeaderCell
        allSelected={allSelected}
        allUnselected={allUnselected}
        onSelectAllChange={onSelectAllChange}
      />

      <VirtualTableHeaderCell
        className={styles.folder}
        name="folder"
      >
        Folder
      </VirtualTableHeaderCell>

      <VirtualTableHeaderCell
        className={styles.monitor}
        name="monitor"
      >
        Monitor

        <Popover
          anchor={
            <Icon
              className={styles.detailsIcon}
              name={icons.INFO}
            />
          }
          title="Monitoring Options"
          body={<ComicMonitoringOptionsPopoverContent />}
          position={tooltipPositions.RIGHT}
        />
      </VirtualTableHeaderCell>

      <VirtualTableHeaderCell
        className={styles.qualityProfile}
        name="qualityProfileId"
      >
        Quality Profile
      </VirtualTableHeaderCell>

      {
        showLanguageProfile &&
          <VirtualTableHeaderCell
            className={styles.languageProfile}
            name="languageProfileId"
          >
            Language Profile
          </VirtualTableHeaderCell>
      }

      <VirtualTableHeaderCell
        className={styles.comicType}
        name="comicType"
      >
        Comic Type

        <Popover
          anchor={
            <Icon
              className={styles.detailsIcon}
              name={icons.INFO}
            />
          }
          title="Comic Type"
          body={<ComicTypePopoverContent />}
          position={tooltipPositions.RIGHT}
        />
      </VirtualTableHeaderCell>

      <VirtualTableHeaderCell
        className={styles.seasonFolder}
        name="seasonFolder"
      >
        Season Folder
      </VirtualTableHeaderCell>

      <VirtualTableHeaderCell
        className={styles.comic}
        name="comic"
      >
        Comic
      </VirtualTableHeaderCell>
    </VirtualTableHeader>
  );
}

ImportComicHeader.propTypes = {
  showLanguageProfile: PropTypes.bool.isRequired,
  allSelected: PropTypes.bool.isRequired,
  allUnselected: PropTypes.bool.isRequired,
  onSelectAllChange: PropTypes.func.isRequired
};

export default ImportComicHeader;
