import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { kinds } from 'Helpers/Props';
import SelectInput from 'Components/Form/SelectInput';
import LanguageProfileSelectInputConnector from 'Components/Form/LanguageProfileSelectInputConnector';
import QualityProfileSelectInputConnector from 'Components/Form/QualityProfileSelectInputConnector';
import RootFolderSelectInputConnector from 'Components/Form/RootFolderSelectInputConnector';
import ComicTypeSelectInput from 'Components/Form/ComicTypeSelectInput';
import SpinnerButton from 'Components/Link/SpinnerButton';
import PageContentFooter from 'Components/Page/PageContentFooter';
import MoveComicModal from 'Comic/MoveComic/MoveComicModal';
import TagsModal from './Tags/TagsModal';
import DeleteComicModal from './Delete/DeleteComicModal';
import ComicEditorFooterLabel from './ComicEditorFooterLabel';
import styles from './ComicEditorFooter.css';

const NO_CHANGE = 'noChange';

class ComicEditorFooter extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      monitored: NO_CHANGE,
      qualityProfileId: NO_CHANGE,
      languageProfileId: NO_CHANGE,
      comicType: NO_CHANGE,
      seasonFolder: NO_CHANGE,
      rootFolderPath: NO_CHANGE,
      savingTags: false,
      isDeleteComicModalOpen: false,
      isTagsModalOpen: false,
      isConfirmMoveModalOpen: false,
      destinationRootFolder: null
    };
  }

  componentDidUpdate(prevProps) {
    const {
      isSaving,
      saveError
    } = this.props;

    if (prevProps.isSaving && !isSaving && !saveError) {
      this.setState({
        monitored: NO_CHANGE,
        qualityProfileId: NO_CHANGE,
        languageProfileId: NO_CHANGE,
        comicType: NO_CHANGE,
        seasonFolder: NO_CHANGE,
        rootFolderPath: NO_CHANGE,
        savingTags: false
      });
    }
  }

  //
  // Listeners

  onInputChange = ({ name, value }) => {
    this.setState({ [name]: value });

    if (value === NO_CHANGE) {
      return;
    }

    switch (name) {
      case 'rootFolderPath':
        this.setState({
          isConfirmMoveModalOpen: true,
          destinationRootFolder: value
        });
        break;
      case 'monitored':
        this.props.onSaveSelected({ [name]: value === 'monitored' });
        break;
      case 'seasonFolder':
        this.props.onSaveSelected({ [name]: value === 'yes' });
        break;
      default:
        this.props.onSaveSelected({ [name]: value });
    }
  }

  onApplyTagsPress = (tags, applyTags) => {
    this.setState({
      savingTags: true,
      isTagsModalOpen: false
    });

    this.props.onSaveSelected({
      tags,
      applyTags
    });
  }

  onDeleteSelectedPress = () => {
    this.setState({ isDeleteComicModalOpen: true });
  }

  onDeleteComicModalClose = () => {
    this.setState({ isDeleteComicModalOpen: false });
  }

  onTagsPress = () => {
    this.setState({ isTagsModalOpen: true });
  }

  onTagsModalClose = () => {
    this.setState({ isTagsModalOpen: false });
  }

  onSaveRootFolderPress = () => {
    this.setState({
      isConfirmMoveModalOpen: false,
      destinationRootFolder: null
    });

    this.props.onSaveSelected({ rootFolderPath: this.state.destinationRootFolder });
  }

  onMoveComicPress = () => {
    this.setState({
      isConfirmMoveModalOpen: false,
      destinationRootFolder: null
    });

    this.props.onSaveSelected({
      rootFolderPath: this.state.destinationRootFolder,
      moveFiles: true
    });
  }

  //
  // Render

  render() {
    const {
      comicIds,
      selectedCount,
      isSaving,
      isDeleting,
      isOrganizingComic,
      columns,
      onOrganizeComicPress
    } = this.props;

    const {
      monitored,
      qualityProfileId,
      languageProfileId,
      comicType,
      seasonFolder,
      rootFolderPath,
      savingTags,
      isTagsModalOpen,
      isDeleteComicModalOpen,
      isConfirmMoveModalOpen,
      destinationRootFolder
    } = this.state;

    const monitoredOptions = [
      { key: NO_CHANGE, value: 'No Change', disabled: true },
      { key: 'monitored', value: 'Monitored' },
      { key: 'unmonitored', value: 'Unmonitored' }
    ];

    const seasonFolderOptions = [
      { key: NO_CHANGE, value: 'No Change', disabled: true },
      { key: 'yes', value: 'Yes' },
      { key: 'no', value: 'No' }
    ];

    return (
      <PageContentFooter>
        <div className={styles.inputContainer}>
          <ComicEditorFooterLabel
            label="Monitor Comic"
            isSaving={isSaving && monitored !== NO_CHANGE}
          />

          <SelectInput
            name="monitored"
            value={monitored}
            values={monitoredOptions}
            isDisabled={!selectedCount}
            onChange={this.onInputChange}
          />
        </div>

        {
          columns.map((column) => {
            const {
              name,
              isVisible
            } = column;

            if (!isVisible) {
              return null;
            }

            if (name === 'qualityProfileId') {
              return (
                <div
                  key={name}
                  className={styles.inputContainer}
                >
                  <ComicEditorFooterLabel
                    label="Quality Profile"
                    isSaving={isSaving && qualityProfileId !== NO_CHANGE}
                  />

                  <QualityProfileSelectInputConnector
                    name="qualityProfileId"
                    value={qualityProfileId}
                    includeNoChange={true}
                    isDisabled={!selectedCount}
                    onChange={this.onInputChange}
                  />
                </div>
              );
            }

            if (name === 'languageProfileId') {
              return (
                <div
                  key={name}
                  className={styles.inputContainer}
                >
                  <ComicEditorFooterLabel
                    label="Language Profile"
                    isSaving={isSaving && languageProfileId !== NO_CHANGE}
                  />

                  <LanguageProfileSelectInputConnector
                    name="languageProfileId"
                    value={languageProfileId}
                    includeNoChange={true}
                    isDisabled={!selectedCount}
                    onChange={this.onInputChange}
                  />
                </div>
              );
            }

            if (name === 'comicType') {
              return (
                <div
                  key={name}
                  className={styles.inputContainer}
                >
                  <ComicEditorFooterLabel
                    label="Comic Type"
                    isSaving={isSaving && comicType !== NO_CHANGE}
                  />

                  <ComicTypeSelectInput
                    name="comicType"
                    value={comicType}
                    includeNoChange={true}
                    isDisabled={!selectedCount}
                    onChange={this.onInputChange}
                  />
                </div>
              );
            }

            if (name === 'seasonFolder') {
              return (
                <div
                  key={name}
                  className={styles.inputContainer}
                >
                  <ComicEditorFooterLabel
                    label="Season Folder"
                    isSaving={isSaving && seasonFolder !== NO_CHANGE}
                  />

                  <SelectInput
                    name="seasonFolder"
                    value={seasonFolder}
                    values={seasonFolderOptions}
                    isDisabled={!selectedCount}
                    onChange={this.onInputChange}
                  />
                </div>
              );
            }

            if (name === 'path') {
              return (
                <div
                  key={name}
                  className={styles.inputContainer}
                >
                  <ComicEditorFooterLabel
                    label="Root Folder"
                    isSaving={isSaving && rootFolderPath !== NO_CHANGE}
                  />

                  <RootFolderSelectInputConnector
                    name="rootFolderPath"
                    value={rootFolderPath}
                    includeNoChange={true}
                    isDisabled={!selectedCount}
                    selectedValueOptions={{ includeFreeSpace: false }}
                    onChange={this.onInputChange}
                  />
                </div>
              );
            }

            return null;
          })
        }

        <div className={styles.buttonContainer}>
          <div className={styles.buttonContainerContent}>
            <ComicEditorFooterLabel
              label={`${selectedCount} Comic Selected`}
              isSaving={false}
            />

            <div className={styles.buttons}>
              <div>
                <SpinnerButton
                  className={styles.organizeSelectedButton}
                  kind={kinds.WARNING}
                  isSpinning={isOrganizingComic}
                  isDisabled={!selectedCount || isOrganizingComic}
                  onPress={onOrganizeComicPress}
                >
                  Rename Files
                </SpinnerButton>

                <SpinnerButton
                  className={styles.tagsButton}
                  isSpinning={isSaving && savingTags}
                  isDisabled={!selectedCount || isOrganizingComic}
                  onPress={this.onTagsPress}
                >
                  Set Tags
                </SpinnerButton>
              </div>

              <SpinnerButton
                className={styles.deleteSelectedButton}
                kind={kinds.DANGER}
                isSpinning={isDeleting}
                isDisabled={!selectedCount || isDeleting}
                onPress={this.onDeleteSelectedPress}
              >
                Delete
              </SpinnerButton>
            </div>
          </div>
        </div>

        <TagsModal
          isOpen={isTagsModalOpen}
          comicIds={comicIds}
          onApplyTagsPress={this.onApplyTagsPress}
          onModalClose={this.onTagsModalClose}
        />

        <DeleteComicModal
          isOpen={isDeleteComicModalOpen}
          comicIds={comicIds}
          onModalClose={this.onDeleteComicModalClose}
        />

        <MoveComicModal
          destinationRootFolder={destinationRootFolder}
          isOpen={isConfirmMoveModalOpen}
          onSavePress={this.onSaveRootFolderPress}
          onMoveComicPress={this.onMoveComicPress}
        />
      </PageContentFooter>
    );
  }
}

ComicEditorFooter.propTypes = {
  comicIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedCount: PropTypes.number.isRequired,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  isDeleting: PropTypes.bool.isRequired,
  deleteError: PropTypes.object,
  isOrganizingComic: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSaveSelected: PropTypes.func.isRequired,
  onOrganizeComicPress: PropTypes.func.isRequired
};

export default ComicEditorFooter;
