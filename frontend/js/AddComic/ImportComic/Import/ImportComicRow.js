import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes } from 'Helpers/Props';
import FormInputGroup from 'Components/Form/FormInputGroup';
import VirtualTableRowCell from 'Components/Table/Cells/VirtualTableRowCell';
import VirtualTableSelectCell from 'Components/Table/Cells/VirtualTableSelectCell';
import ImportComicSelectComicConnector from './SelectComic/ImportComicSelectComicConnector';
import styles from './ImportComicRow.css';

function ImportComicRow(props) {
  const {
    id,
    monitor,
    qualityProfileId,
    languageProfileId,
    seasonFolder,
    comicType,
    selectedComic,
    isExistingComic,
    showLanguageProfile,
    isSelected,
    onSelectedChange,
    onInputChange
  } = props;

  return (
    <>
      <VirtualTableSelectCell
        inputClassName={styles.selectInput}
        id={id}
        isSelected={isSelected}
        isDisabled={!selectedComic || isExistingComic}
        onSelectedChange={onSelectedChange}
      />

      <VirtualTableRowCell className={styles.folder}>
        {id}
      </VirtualTableRowCell>

      <VirtualTableRowCell className={styles.monitor}>
        <FormInputGroup
          type={inputTypes.MONITOR_EPISODES_SELECT}
          name="monitor"
          value={monitor}
          onChange={onInputChange}
        />
      </VirtualTableRowCell>

      <VirtualTableRowCell className={styles.qualityProfile}>
        <FormInputGroup
          type={inputTypes.QUALITY_PROFILE_SELECT}
          name="qualityProfileId"
          value={qualityProfileId}
          onChange={onInputChange}
        />
      </VirtualTableRowCell>

      <VirtualTableRowCell
        className={showLanguageProfile ? styles.languageProfile : styles.hideLanguageProfile}
      >
        <FormInputGroup
          type={inputTypes.LANGUAGE_PROFILE_SELECT}
          name="languageProfileId"
          value={languageProfileId}
          onChange={onInputChange}
        />
      </VirtualTableRowCell>

      <VirtualTableRowCell className={styles.comicType}>
        <FormInputGroup
          type={inputTypes.COMIC_TYPE_SELECT}
          name="comicType"
          value={comicType}
          onChange={onInputChange}
        />
      </VirtualTableRowCell>

      <VirtualTableRowCell className={styles.seasonFolder}>
        <FormInputGroup
          type={inputTypes.CHECK}
          name="seasonFolder"
          value={seasonFolder}
          onChange={onInputChange}
        />
      </VirtualTableRowCell>

      <VirtualTableRowCell className={styles.comic}>
        <ImportComicSelectComicConnector
          id={id}
          isExistingComic={isExistingComic}
          onInputChange={onInputChange}
        />
      </VirtualTableRowCell>
    </>
  );
}

ImportComicRow.propTypes = {
  id: PropTypes.string.isRequired,
  monitor: PropTypes.string.isRequired,
  qualityProfileId: PropTypes.number.isRequired,
  languageProfileId: PropTypes.number.isRequired,
  comicType: PropTypes.string.isRequired,
  seasonFolder: PropTypes.bool.isRequired,
  selectedComic: PropTypes.object,
  isExistingComic: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  showLanguageProfile: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
  onSelectedChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

ImportComicRow.defaultsProps = {
  items: []
};

export default ImportComicRow;
