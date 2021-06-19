import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getErrorMessage from 'Utilities/Object/getErrorMessage';
import getSelectedIds from 'Utilities/Table/getSelectedIds';
import selectAll from 'Utilities/Table/selectAll';
import toggleSelected from 'Utilities/Table/toggleSelected';
import { align, icons, kinds, scrollDirections } from 'Helpers/Props';
import Button from 'Components/Link/Button';
import Icon from 'Components/Icon';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import SelectInput from 'Components/Form/SelectInput';
import Menu from 'Components/Menu/Menu';
import MenuButton from 'Components/Menu/MenuButton';
import MenuContent from 'Components/Menu/MenuContent';
import SelectedMenuItem from 'Components/Menu/SelectedMenuItem';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import SelectIssueModal from 'InteractiveImport/Issue/SelectIssueModal';
import SelectComicModal from 'InteractiveImport/Comic/SelectComicModal';
import InteractiveImportRow from './InteractiveImportRow';
import styles from './InteractiveImportModalContent.css';

const columns = [
  {
    name: 'relativePath',
    label: 'Relative Path',
    isSortable: true,
    isVisible: true
  },
  {
    name: 'comic',
    label: 'Comic',
    isSortable: true,
    isVisible: true
  },
  {
    name: 'issues',
    label: 'Issue(s)',
    isVisible: true
  },
  {
    name: 'size',
    label: 'Size',
    isSortable: true,
    isVisible: true
  },
  {
    name: 'rejections',
    label: React.createElement(Icon, {
      name: icons.DANGER,
      kind: kinds.DANGER
    }),
    isVisible: true
  }
];

const filterExistingFilesOptions = {
  ALL: 'all',
  NEW: 'new'
};

const importModeOptions = [
  { key: 'move', value: 'Move Files' },
  { key: 'copy', value: 'Hardlink/Copy Files' }
];

const SELECT = 'select';
const COMIC = 'comic';
const ISSUE = 'issue';

class InteractiveImportModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      allSelected: false,
      allUnselected: false,
      lastToggled: null,
      selectedState: {},
      invalidRowsSelected: [],
      selectModalOpen: null
    };
  }

  //
  // Control

  getSelectedIds = () => {
    return getSelectedIds(this.state.selectedState);
  }

  //
  // Listeners

  onSelectAllChange = ({ value }) => {
    this.setState(selectAll(this.state.selectedState, value));
  }

  onSelectedChange = ({ id, value, shiftKey = false }) => {
    this.setState((state) => {
      return toggleSelected(state, this.props.items, id, value, shiftKey);
    });
  }

  onValidRowChange = (id, isValid) => {
    this.setState((state) => {
      if (isValid) {
        return {
          invalidRowsSelected: _.without(state.invalidRowsSelected, id)
        };
      }

      return {
        invalidRowsSelected: [...state.invalidRowsSelected, id]
      };
    });
  }

  onImportSelectedPress = () => {
    const {
      downloadId,
      showImportMode,
      importMode,
      onImportSelectedPress
    } = this.props;

    const selected = this.getSelectedIds();
    const finalImportMode = downloadId || !showImportMode ? 'auto' : importMode;

    onImportSelectedPress(selected, finalImportMode);
  }

  onFilterExistingFilesChange = (value) => {
    this.props.onFilterExistingFilesChange(value !== filterExistingFilesOptions.ALL);
  }

  onImportModeChange = ({ value }) => {
    this.props.onImportModeChange(value);
  }

  onSelectModalSelect = ({ value }) => {
    this.setState({ selectModalOpen: value });
  }

  onSelectModalClose = () => {
    this.setState({ selectModalOpen: null });
  }

  //
  // Render

  render() {
    const {
      downloadId,
      allowComicChange,
      showFilterExistingFiles,
      showImportMode,
      filterExistingFiles,
      title,
      folder,
      isFetching,
      isPopulated,
      error,
      items,
      sortKey,
      sortDirection,
      importMode,
      interactiveImportErrorMessage,
      onSortPress,
      onModalClose
    } = this.props;

    const {
      allSelected,
      allUnselected,
      selectedState,
      invalidRowsSelected,
      selectModalOpen
    } = this.state;

    const selectedIds = this.getSelectedIds();

    const orderedSelectedIds = items.reduce((acc, file) => {
      if (selectedIds.includes(file.id)) {
        acc.push(file.id);
      }

      return acc;
    }, []);

    const selectedItem = selectedIds.length ?
      items.find((file) => file.id === selectedIds[0]) :
      null;

    const errorMessage = getErrorMessage(error, 'Unable to load manual import items');

    const bulkSelectOptions = [
      { key: SELECT, value: 'Select...', disabled: true },
      { key: ISSUE, value: 'Select Issue(s)' },
    ];

    if (allowComicChange) {
      bulkSelectOptions.splice(1, 0, {
        key: COMIC,
        value: 'Select Comic'
      });
    }

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          Manual Import - {title || folder}
        </ModalHeader>

        <ModalBody scrollDirection={scrollDirections.BOTH}>
          {
            showFilterExistingFiles &&
              <div className={styles.filterContainer}>
                <Menu alignMenu={align.RIGHT}>
                  <MenuButton>
                    <Icon
                      name={icons.FILTER}
                      size={22}
                    />

                    <div className={styles.filterText}>
                      {
                        filterExistingFiles ? 'Unmapped Files Only' : 'All Files'
                      }
                    </div>
                  </MenuButton>

                  <MenuContent>
                    <SelectedMenuItem
                      name={filterExistingFilesOptions.ALL}
                      isSelected={!filterExistingFiles}
                      onPress={this.onFilterExistingFilesChange}
                    >
                      All Files
                    </SelectedMenuItem>

                    <SelectedMenuItem
                      name={filterExistingFilesOptions.NEW}
                      isSelected={filterExistingFiles}
                      onPress={this.onFilterExistingFilesChange}
                    >
                      Unmapped Files Only
                    </SelectedMenuItem>
                  </MenuContent>
                </Menu>
              </div>
          }

          {
            isFetching &&
              <LoadingIndicator />
          }

          {
            error &&
              <div>{errorMessage}</div>
          }

          {
            isPopulated && !!items.length && !isFetching && !isFetching &&
              <Table
                columns={columns}
                horizontalScroll={true}
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
                      return (
                        <InteractiveImportRow
                          key={item.id}
                          isSelected={selectedState[item.id]}
                          {...item}
                          allowComicChange={allowComicChange}
                          onSelectedChange={this.onSelectedChange}
                          onValidRowChange={this.onValidRowChange}
                        />
                      );
                    })
                  }
                </TableBody>
              </Table>
          }

          {
            isPopulated && !items.length && !isFetching &&
              'No video files were found in the selected folder'
          }
        </ModalBody>

        <ModalFooter className={styles.footer}>
          <div className={styles.leftButtons}>
            {
              !downloadId && showImportMode ?
                <SelectInput
                  className={styles.importMode}
                  name="importMode"
                  value={importMode}
                  values={importModeOptions}
                  onChange={this.onImportModeChange}
                /> :
                null
            }

            <SelectInput
              className={styles.bulkSelect}
              name="select"
              value={SELECT}
              values={bulkSelectOptions}
              isDisabled={!selectedIds.length}
              onChange={this.onSelectModalSelect}
            />
          </div>

          <div className={styles.rightButtons}>
            <Button onPress={onModalClose}>
              Cancel
            </Button>

            {
              interactiveImportErrorMessage &&
                <span className={styles.errorMessage}>{interactiveImportErrorMessage}</span>
            }

            <Button
              kind={kinds.SUCCESS}
              isDisabled={!selectedIds.length || !!invalidRowsSelected.length}
              onPress={this.onImportSelectedPress}
            >
              Import
            </Button>
          </div>
        </ModalFooter>

        <SelectComicModal
          isOpen={selectModalOpen === COMIC}
          ids={selectedIds}
          onModalClose={this.onSelectModalClose}
        />

        <SelectIssueModal
          isOpen={selectModalOpen === ISSUE}
          ids={orderedSelectedIds}
          comicId={selectedItem && selectedItem.comic && selectedItem.comic.id}
          onModalClose={this.onSelectModalClose}
        />
      </ModalContent>
    );
  }
}

InteractiveImportModalContent.propTypes = {
  downloadId: PropTypes.string,
  allowComicChange: PropTypes.bool.isRequired,
  showImportMode: PropTypes.bool.isRequired,
  showFilterExistingFiles: PropTypes.bool.isRequired,
  filterExistingFiles: PropTypes.bool.isRequired,
  importMode: PropTypes.string.isRequired,
  title: PropTypes.string,
  folder: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortKey: PropTypes.string,
  sortDirection: PropTypes.string,
  interactiveImportErrorMessage: PropTypes.string,
  onSortPress: PropTypes.func.isRequired,
  onFilterExistingFilesChange: PropTypes.func.isRequired,
  onImportModeChange: PropTypes.func.isRequired,
  onImportSelectedPress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

InteractiveImportModalContent.defaultProps = {
  allowComicChange: true,
  showFilterExistingFiles: false,
  showImportMode: true,
  importMode: 'move'
};

export default InteractiveImportModalContent;
