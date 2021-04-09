import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { inputTypes, kinds } from 'Helpers/Props';
import FormGroup from 'Components/Form/FormGroup';
import FormLabel from 'Components/Form/FormLabel';
import FormInputGroup from 'Components/Form/FormInputGroup';
import Button from 'Components/Link/Button';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import styles from './DeleteComicModalContent.css';

class DeleteComicModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      deleteFiles: false,
      addImportListExclusion: false
    };
  }

  //
  // Listeners

  onDeleteFilesChange = ({ value }) => {
    this.setState({ deleteFiles: value });
  }

  onAddImportListExclusionChange = ({ value }) => {
    this.setState({ addImportListExclusion: value });
  }

  onDeleteComicConfirmed = () => {
    const {
      addImportListExclusion,
      deleteFiles
    } = this.state;

    this.setState({ deleteFiles: false, addImportListExclusion: false });
    this.props.onDeleteSelectedPress(deleteFiles, addImportListExclusion);
  }

  //
  // Render

  render() {
    const {
      comic,
      onModalClose
    } = this.props;

    const {
      addImportListExclusion,
      deleteFiles
    } = this.state;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          Delete Selected Comic
        </ModalHeader>

        <ModalBody>
          <div>
            <FormGroup>
              <FormLabel>Add List Exclusion</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="addImportListExclusion"
                value={addImportListExclusion}
                helpText="Prevent comic from being added to Sonarr by lists"
                onChange={this.onAddImportListExclusionChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{`Delete Comic Folder${comic.length > 1 ? 's' : ''}`}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="deleteFiles"
                value={deleteFiles}
                helpText={`Delete Comic Folder${comic.length > 1 ? 's' : ''} and all contents`}
                kind={kinds.DANGER}
                onChange={this.onDeleteFilesChange}
              />
            </FormGroup>
          </div>

          <div className={styles.message}>
            {`Are you sure you want to delete ${comic.length} selected comic${deleteFiles ? ' and all contents' : ''}?`}
          </div>

          <ul>
            {
              comic.map((s) => {
                return (
                  <li key={s.title}>
                    <span>{s.title}</span>

                    {
                      deleteFiles &&
                        <span className={styles.pathContainer}>
                          -
                          <span className={styles.path}>
                            {s.path}
                          </span>
                        </span>
                    }
                  </li>
                );
              })
            }
          </ul>
        </ModalBody>

        <ModalFooter>
          <Button onPress={onModalClose}>
            Cancel
          </Button>

          <Button
            kind={kinds.DANGER}
            onPress={this.onDeleteComicConfirmed}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

DeleteComicModalContent.propTypes = {
  comic: PropTypes.arrayOf(PropTypes.object).isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteSelectedPress: PropTypes.func.isRequired
};

export default DeleteComicModalContent;
