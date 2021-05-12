import PropTypes from 'prop-types';
import React from 'react';
import { inputTypes, kinds } from 'Helpers/Props';
import Alert from 'Components/Alert';
import Button from 'Components/Link/Button';
import SpinnerErrorButton from 'Components/Link/SpinnerErrorButton';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import FormInputHelpText from 'Components/Form/FormInputHelpText';
import ProviderFieldFormGroup from 'Components/Form/ProviderFieldFormGroup';
import styles from './EditNotificationModalContent.css';

function EditNotificationModalContent(props) {
  const {
    advancedSettings,
    isFetching,
    error,
    isSaving,
    isTesting,
    saveError,
    item,
    onInputChange,
    onFieldChange,
    onModalClose,
    onSavePress,
    onTestPress,
    onDeleteNotificationPress,
    ...otherProps
  } = props;

  const {
    id,
    implementationName,
    name,
    onGrab,
    onDownload,
    onUpgrade,
    onRename,
    onComicDelete,
    onIssueFileDelete,
    onIssueFileDeleteForUpgrade,
    onHealthIssue,
    supportsOnGrab,
    supportsOnDownload,
    supportsOnUpgrade,
    supportsOnRename,
    supportsOnComicDelete,
    supportsOnIssueFileDelete,
    supportsOnIssueFileDeleteForUpgrade,
    supportsOnHealthIssue,
    includeHealthWarnings,
    tags,
    fields,
    message
  } = item;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        {`${id ? 'Edit' : 'Add'} Connection - ${implementationName}`}
      </ModalHeader>

      <ModalBody>
        {
          isFetching &&
            <LoadingIndicator />
        }

        {
          !isFetching && !!error &&
            <div>Unable to add a new notification, please try again.</div>
        }

        {
          !isFetching && !error &&
            <Form {...otherProps}>
              {
                !!message &&
                  <Alert
                    className={styles.message}
                    kind={message.value.type}
                  >
                    {message.value.message}
                  </Alert>
              }

              <FormGroup>
                <FormLabel>Name</FormLabel>

                <FormInputGroup
                  type={inputTypes.TEXT}
                  name="name"
                  {...name}
                  onChange={onInputChange}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Triggers</FormLabel>

                <div className={styles.triggers}>
                  <FormInputHelpText
                    text="Select which events should trigger this conection"
                    link="https://wiki.servarr.com/Paperback_Settings#Connections"
                  />

                  <div className={styles.triggerEvents}>
                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="onGrab"
                      helpText="On Grab"
                      isDisabled={!supportsOnGrab.value}
                      {...onGrab}
                      onChange={onInputChange}
                    />

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="onDownload"
                      helpText="On Import"
                      isDisabled={!supportsOnDownload.value}
                      {...onDownload}
                      onChange={onInputChange}
                    />

                    {
                      onDownload.value ?
                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="onUpgrade"
                          helpText="On Upgrade"
                          isDisabled={!supportsOnUpgrade.value}
                          {...onUpgrade}
                          onChange={onInputChange}
                        /> :
                        null
                    }

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="onRename"
                      helpText="On Rename"
                      isDisabled={!supportsOnRename.value}
                      {...onRename}
                      onChange={onInputChange}
                    />

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="onComicDelete"
                      helpText="On Comic Delete"
                      isDisabled={!supportsOnComicDelete.value}
                      {...onComicDelete}
                      onChange={onInputChange}
                    />

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="onIssueFileDelete"
                      helpText="On Issue File Delete"
                      isDisabled={!supportsOnIssueFileDelete.value}
                      {...onIssueFileDelete}
                      onChange={onInputChange}
                    />

                    {
                      onIssueFileDelete.value ?
                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="onIssueFileDeleteForUpgrade"
                          helpText="On Issue File Delete For Upgrade"
                          isDisabled={!supportsOnIssueFileDeleteForUpgrade.value}
                          {...onIssueFileDeleteForUpgrade}
                          onChange={onInputChange}
                        /> :
                        null
                    }

                    <FormInputGroup
                      type={inputTypes.CHECK}
                      name="onHealthIssue"
                      helpText="On Health Issue"
                      isDisabled={!supportsOnHealthIssue.value}
                      {...onHealthIssue}
                      onChange={onInputChange}
                    />

                    {
                      onHealthIssue.value ?
                        <FormInputGroup
                          type={inputTypes.CHECK}
                          name="includeHealthWarnings"
                          helpText="Include Health Warnings"
                          isDisabled={!supportsOnHealthIssue.value}
                          {...includeHealthWarnings}
                          onChange={onInputChange}
                        /> :
                        null
                    }
                  </div>
                </div>
              </FormGroup>

              <FormGroup>
                <FormLabel>Tags</FormLabel>

                <FormInputGroup
                  type={inputTypes.TAG}
                  name="tags"
                  helpText="Only send notifications for comic with at least one matching tag"
                  {...tags}
                  onChange={onInputChange}
                />
              </FormGroup>

              {
                fields.map((field) => {
                  return (
                    <ProviderFieldFormGroup
                      key={field.name}
                      advancedSettings={advancedSettings}
                      provider="notification"
                      providerData={item}
                      section="settings.notifications"
                      {...field}
                      onChange={onFieldChange}
                    />
                  );
                })
              }

            </Form>
        }
      </ModalBody>
      <ModalFooter>
        {
          id &&
            <Button
              className={styles.deleteButton}
              kind={kinds.DANGER}
              onPress={onDeleteNotificationPress}
            >
              Delete
            </Button>
        }

        <SpinnerErrorButton
          isSpinning={isTesting}
          error={saveError}
          onPress={onTestPress}
        >
          Test
        </SpinnerErrorButton>

        <Button
          onPress={onModalClose}
        >
          Cancel
        </Button>

        <SpinnerErrorButton
          isSpinning={isSaving}
          error={saveError}
          onPress={onSavePress}
        >
          Save
        </SpinnerErrorButton>
      </ModalFooter>
    </ModalContent>
  );
}

EditNotificationModalContent.propTypes = {
  advancedSettings: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isSaving: PropTypes.bool.isRequired,
  isTesting: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  item: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onTestPress: PropTypes.func.isRequired,
  onDeleteNotificationPress: PropTypes.func
};

export default EditNotificationModalContent;