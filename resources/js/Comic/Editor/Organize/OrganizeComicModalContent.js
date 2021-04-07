import PropTypes from 'prop-types';
import React from 'react';
import { icons, kinds } from '@/Helpers/Props';
import Alert from '@/Components/Alert';
import Button from '@/Components/Link/Button';
import Icon from '@/Components/Icon';
import ModalContent from '@/Components/Modal/ModalContent';
import ModalHeader from '@/Components/Modal/ModalHeader';
import ModalBody from '@/Components/Modal/ModalBody';
import ModalFooter from '@/Components/Modal/ModalFooter';
import styles from './OrganizeComicModalContent.module.scss';

function OrganizeComicModalContent(props) {
  const {
    comicTitles,
    onModalClose,
    onOrganizeComicPress
  } = props;

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>
        Organize Selected Comic
      </ModalHeader>

      <ModalBody>
        <Alert>
          Tip: To preview a rename, select "Cancel", then select any comic title and use the
          <Icon
            className={styles.renameIcon}
            name={icons.ORGANIZE}
          />
        </Alert>

        <div className={styles.message}>
          Are you sure you want to organize all files in the {comicTitles.length} selected comic?
        </div>

        <ul>
          {
            comicTitles.map((title) => {
              return (
                <li key={title}>
                  {title}
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
          onPress={onOrganizeComicPress}
        >
          Organize
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

OrganizeComicModalContent.propTypes = {
  comicTitles: PropTypes.arrayOf(PropTypes.string).isRequired,
  onModalClose: PropTypes.func.isRequired,
  onOrganizeComicPress: PropTypes.func.isRequired
};

export default OrganizeComicModalContent;
