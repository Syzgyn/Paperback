import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { icons, kinds, inputTypes, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Truncate from 'Components/Truncate';
import SpinnerButton from 'Components/Link/SpinnerButton';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import CheckInput from 'Components/Form/CheckInput';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Popover from 'Components/Tooltip/Popover';
import ComicPoster from 'Comic/ComicPoster';
import * as comicTypes from 'Utilities/Comic/comicTypes';
import ComicMonitoringOptionsPopoverContent from 'AddComic/ComicMonitoringOptionsPopoverContent';
import ComicTypePopoverContent from 'AddComic/ComicTypePopoverContent';
import styles from './AddNewComicModalContent.css';

class AddNewComicModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      comicType: props.initialComicType === comicTypes.STANDARD ?
        props.comicType.value :
        props.initialComicType
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.comicType.value !== prevProps.comicType.value) {
      this.setState({ comicType: this.props.comicType.value });
    }
  }

  //
  // Listeners

  onAddComicPress = () => {
    const {
      comicType
    } = this.state;

    this.props.onAddComicPress(
      comicType
    );
  }

  //
  // Render

  render() {
    const {
      title,
      year,
      overview,
      images,
      isAdding,
      rootFolderPath,
      monitor,
      qualityProfileId,
      languageProfileId,
      comicType,
      seasonFolder,
      searchForMissingIssues,
      searchForCutoffUnmetIssues,
      folder,
      tags,
      isSmallScreen,
      isWindows,
      onModalClose,
      onInputChange,
      ...otherProps
    } = this.props;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {title}

          {
            !title.contains(year) && !!year &&
              <span className={styles.year}>({year})</span>
          }
        </ModalHeader>

        <ModalBody>
          <div className={styles.container}>
            {
              isSmallScreen ?
                null :
                <div className={styles.poster}>
                  <ComicPoster
                    className={styles.poster}
                    images={images}
                    size={250}
                  />
                </div>
            }

            <div className={styles.info}>
              {
                overview ?
                  <div className={styles.overview}>
                    <Truncate
                      lines={10}
                      html={overview}
                      removeLinks
                    />
                  </div> :
                  null
              }

              <Form {...otherProps}>
                <FormGroup>
                  <FormLabel>Root Folder</FormLabel>

                  <FormInputGroup
                    type={inputTypes.ROOT_FOLDER_SELECT}
                    name="rootFolderPath"
                    valueOptions={{
                      comicFolder: folder,
                      isWindows
                    }}
                    selectedValueOptions={{
                      comicFolder: folder,
                      isWindows
                    }}
                    helpText={`'${folder}' subfolder will be created automatically`}
                    onChange={onInputChange}
                    {...rootFolderPath}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>
                    Monitor

                    <Popover
                      anchor={
                        <Icon
                          className={styles.labelIcon}
                          name={icons.INFO}
                        />
                      }
                      title="Monitoring Options"
                      body={<ComicMonitoringOptionsPopoverContent />}
                      position={tooltipPositions.RIGHT}
                    />
                  </FormLabel>

                  <FormInputGroup
                    type={inputTypes.MONITOR_ISSUES_SELECT}
                    name="monitor"
                    onChange={onInputChange}
                    {...monitor}
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Tags</FormLabel>

                  <FormInputGroup
                    type={inputTypes.TAG}
                    name="tags"
                    onChange={onInputChange}
                    {...tags}
                  />
                </FormGroup>
              </Form>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className={styles.modalFooter}>
          <div>
            <label className={styles.searchLabelContainer}>
              <span className={styles.searchLabel}>
                Start search for missing issues
              </span>

              <CheckInput
                containerClassName={styles.searchInputContainer}
                className={styles.searchInput}
                name="searchForMissingIssues"
                onChange={onInputChange}
                {...searchForMissingIssues}
              />
            </label>

            <label className={styles.searchLabelContainer}>
              <span className={styles.searchLabel}>
                Start search for cutoff unmet issues
              </span>

              <CheckInput
                containerClassName={styles.searchInputContainer}
                className={styles.searchInput}
                name="searchForCutoffUnmetIssues"
                onChange={onInputChange}
                {...searchForCutoffUnmetIssues}
              />
            </label>
          </div>

          <SpinnerButton
            className={styles.addButton}
            kind={kinds.SUCCESS}
            isSpinning={isAdding}
            onPress={this.onAddComicPress}
          >
            Add {title}
          </SpinnerButton>
        </ModalFooter>
      </ModalContent>
    );
  }
}

AddNewComicModalContent.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  overview: PropTypes.string,
  initialComicType: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAdding: PropTypes.bool.isRequired,
  addError: PropTypes.object,
  rootFolderPath: PropTypes.object,
  monitor: PropTypes.object.isRequired,
  qualityProfileId: PropTypes.object,
  languageProfileId: PropTypes.object,
  comicType: PropTypes.object.isRequired,
  seasonFolder: PropTypes.object.isRequired,
  searchForMissingIssues: PropTypes.object.isRequired,
  searchForCutoffUnmetIssues: PropTypes.object.isRequired,
  folder: PropTypes.string.isRequired,
  tags: PropTypes.object.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  isWindows: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onAddComicPress: PropTypes.func.isRequired
};

export default AddNewComicModalContent;
