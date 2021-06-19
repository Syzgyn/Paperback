import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getErrorMessage from 'Utilities/Object/getErrorMessage';
import getSelectedIds from 'Utilities/Table/getSelectedIds';
import selectAll from 'Utilities/Table/selectAll';
import toggleSelected from 'Utilities/Table/toggleSelected';
import { kinds, scrollDirections } from 'Helpers/Props';
import TextInput from 'Components/Form/TextInput';
import Button from 'Components/Link/Button';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Scroller from 'Components/Scroller/Scroller';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import SelectIssueRow from './SelectIssueRow';
import styles from './SelectIssueModalContent.css';

const columns = [
  {
    name: 'issueNumber',
    label: '#',
    isSortable: true,
    isVisible: true
  },
  {
    name: 'title',
    label: 'Title',
    isVisible: true
  },
  {
    name: 'releaseDate',
    label: 'Air Date',
    isVisible: true
  }
];

class SelectIssueModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      allSelected: false,
      allUnselected: false,
      filter: '',
      lastToggled: null,
      selectedState: {}
    };
  }

  //
  // Control

  getSelectedIds = () => {
    return getSelectedIds(this.state.selectedState);
  }

  //
  // Listeners

  onFilterChange = ({ value }) => {
    this.setState({ filter: value.toLowerCase() });
  }

  onSelectAllChange = ({ value }) => {
    this.setState(selectAll(this.state.selectedState, value));
  }

  onSelectedChange = ({ id, value, shiftKey = false }) => {
    this.setState((state) => {
      return toggleSelected(state, this.props.items, id, value, shiftKey);
    });
  }

  onIssuesSelect = () => {
    this.props.onIssuesSelect(this.getSelectedIds());
  }

  //
  // Render

  render() {
    const {
      ids,
      isFetching,
      isPopulated,
      error,
      items,
      relativePath,
      isAnime,
      sortKey,
      sortDirection,
      onSortPress,
      onModalClose
    } = this.props;

    const {
      allSelected,
      allUnselected,
      filter,
      selectedState
    } = this.state;
    const filterIssueNumber = parseInt(filter);

    const errorMessage = getErrorMessage(error, 'Unable to load issues');

    const selectedFilesCount = ids.length;
    const selectedCount = this.getSelectedIds().length;
    const selectionIsValid = (
      selectedCount > 0 &&
      selectedCount % selectedFilesCount === 0
    );

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          <div className={styles.header}>
            Manual Import - Select Issue(s)
          </div>

        </ModalHeader>

        <ModalBody
          className={styles.modalBody}
          scrollDirection={scrollDirections.NONE}
        >
          <TextInput
            className={styles.filterInput}
            placeholder="Filter issues by title or number"
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
              isFetching ? <LoadingIndicator /> : null
            }

            {
              error ? <div>{errorMessage}</div> : null
            }

            {
              isPopulated && !!items.length ?
                <Table
                  columns={columns}
                  selectAll={true}
                  allSelected={allSelected}
                  allUnselected={allUnselected}
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  onSortPress={onSortPress}
                  onSelectAllChange={this.onSelectAllChange}
                >
                  <TableBody>
                    {
                      items.map((item) => {
                        return item.title.toLowerCase().includes(filter) ||
                          item.issueNumber === filterIssueNumber ?
                          (
                            <SelectIssueRow
                              key={item.id}
                              id={item.id}
                              issueNumber={item.issueNumber}
                              absoluteIssueNumber={item.absoluteIssueNumber}
                              title={item.title}
                              releaseDate={item.releaseDate}
                              isAnime={isAnime}
                              isSelected={selectedState[item.id]}
                              onSelectedChange={this.onSelectedChange}
                            />
                          ) :
                          null;
                      })
                    }
                  </TableBody>
                </Table> :
                null
            }

            {
              isPopulated && !items.length ?
                'No issues were found' :
                null
            }
          </Scroller>
        </ModalBody>

        <ModalFooter className={styles.footer}>
          <div className={styles.path}>
            {
              relativePath ?
                relativePath :
                `${selectedFilesCount} selected files`
            }
          </div>

          <div className={styles.buttons}>
            <Button onPress={onModalClose}>
              Cancel
            </Button>

            <Button
              kind={kinds.SUCCESS}
              isDisabled={!selectionIsValid}
              onPress={this.onIssuesSelect}
            >
              Select Issues
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    );
  }
}

SelectIssueModalContent.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  relativePath: PropTypes.string,
  isAnime: PropTypes.bool.isRequired,
  sortKey: PropTypes.string,
  sortDirection: PropTypes.string,
  onSortPress: PropTypes.func.isRequired,
  onIssuesSelect: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default SelectIssueModalContent;
