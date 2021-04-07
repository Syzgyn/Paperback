import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes, kinds } from '@/Helpers/Props';
import Button from '@/Components/Link/Button';
import SpinnerButton from '@/Components/Link/SpinnerButton';
import ModalContent from '@/Components/Modal/ModalContent';
import ModalHeader from '@/Components/Modal/ModalHeader';
import ModalBody from '@/Components/Modal/ModalBody';
import ModalFooter from '@/Components/Modal/ModalFooter';
import Form from '@/Components/Form/Form';
import FormGroup from '@/Components/Form/FormGroup';
import FormLabel from '@/Components/Form/FormLabel';
import FormInputGroup from '@/Components/Form/FormInputGroup';
import MoveComicModal from '@/Comic/MoveComic/MoveComicModal';
import styles from './EditComicModalContent.module.scss';

class EditComicModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isConfirmMoveModalOpen: false
    };
  }

  //
  // Listeners

  onSavePress() {
    const {
      isPathChanging,
      onSavePress
    } = this.props;

    if (isPathChanging && !this.state.isConfirmMoveModalOpen) {
      this.setState({ isConfirmMoveModalOpen: true });
    } else {
      this.setState({ isConfirmMoveModalOpen: false });

      onSavePress(false);
    }
  }

  onMoveComicPress() {
    this.setState({ isConfirmMoveModalOpen: false });

    this.props.onSavePress(true);
  }

  //
  // Render

  render() {
    const {
      title,
      item,
      isSaving,
      showLanguageProfile,
      originalPath,
      onInputChange,
      onModalClose,
      onDeleteComicPress,
      ...otherProps
    } = this.props;

    const {
      monitored,
      seasonFolder,
      qualityProfileId,
      languageProfileId,
      comicType,
      path,
      tags
    } = item;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          Edit - {title}
        </ModalHeader>

        <ModalBody>
          <Form {...otherProps}>
            <FormGroup>
              <FormLabel>Monitored</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="monitored"
                helpText="Download monitored issues in this comic"
                {...monitored}
                onChange={onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Use Season Folder</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="seasonFolder"
                helpText="Sort episodes into season folders"
                {...seasonFolder}
                onChange={onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Quality Profile</FormLabel>

              <FormInputGroup
                type={inputTypes.QUALITY_PROFILE_SELECT}
                name="qualityProfileId"
                {...qualityProfileId}
                onChange={onInputChange}
              />
            </FormGroup>

            {
              showLanguageProfile &&
                <FormGroup>
                  <FormLabel>Language Profile</FormLabel>

                  <FormInputGroup
                    type={inputTypes.LANGUAGE_PROFILE_SELECT}
                    name="languageProfileId"
                    {...languageProfileId}
                    onChange={onInputChange}
                  />
                </FormGroup>
            }

            <FormGroup>
              <FormLabel>Comic Type</FormLabel>

              <FormInputGroup
                type={inputTypes.SERIES_TYPE_SELECT}
                name="comicType"
                {...comicType}
                onChange={onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Path</FormLabel>

              <FormInputGroup
                type={inputTypes.PATH}
                name="path"
                {...path}
                onChange={onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Tags</FormLabel>

              <FormInputGroup
                type={inputTypes.TAG}
                name="tags"
                {...tags}
                onChange={onInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            className={styles.deleteButton}
            kind={kinds.DANGER}
            onPress={onDeleteComicPress}
          >
            Delete
          </Button>

          <Button
            onPress={onModalClose}
          >
            Cancel
          </Button>

          <SpinnerButton
            isSpinning={isSaving}
            onPress={this.onSavePress}
          >
            Save
          </SpinnerButton>
        </ModalFooter>

        <MoveComicModal
          originalPath={originalPath}
          destinationPath={path.value}
          isOpen={this.state.isConfirmMoveModalOpen}
          onSavePress={this.onSavePress}
          onMoveComicPress={this.onMoveComicPress}
        />
      </ModalContent>
    );
  }
}

EditComicModalContent.propTypes = {
  comicId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired,
  showLanguageProfile: PropTypes.bool.isRequired,
  isPathChanging: PropTypes.bool.isRequired,
  originalPath: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteComicPress: PropTypes.func.isRequired
};

export default EditComicModalContent;
