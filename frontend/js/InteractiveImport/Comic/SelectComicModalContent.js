import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { scrollDirections } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Scroller from 'Components/Scroller/Scroller';
import TextInput from 'Components/Form/TextInput';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import SelectComicRow from './SelectComicRow';
import styles from './SelectComicModalContent.css';

class SelectComicModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      filter: ''
    };
  }

  //
  // Listeners

  onFilterChange = ({ value }) => {
    this.setState({ filter: value });
  }

  //
  // Render

  render() {
    const {
      items,
      onComicSelect,
      onModalClose
    } = this.props;

    const filter = this.state.filter;
    const filterLower = filter.toLowerCase();

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          Manual Import - Select Comic
        </ModalHeader>

        <ModalBody
          className={styles.modalBody}
          scrollDirection={scrollDirections.NONE}
        >
          <TextInput
            className={styles.filterInput}
            placeholder="Filter comic"
            name="filter"
            value={filter}
            autoFocus={true}
            onChange={this.onFilterChange}
          />

          <Scroller
            className={styles.scroller}
            autoFocus={false}
          >
            {
              items.map((item) => {
                return item.title.toLowerCase().includes(filterLower) ?
                  (
                    <SelectComicRow
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      onComicSelect={onComicSelect}
                    />
                  ) :
                  null;
              })
            }
          </Scroller>
        </ModalBody>

        <ModalFooter>
          <Button onPress={onModalClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

SelectComicModalContent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComicSelect: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default SelectComicModalContent;
