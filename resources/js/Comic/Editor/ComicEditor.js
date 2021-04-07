import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getSelectedIds from '@/Utilities/Table/getSelectedIds';
import selectAll from '@/Utilities/Table/selectAll';
import toggleSelected from '@/Utilities/Table/toggleSelected';
import { align, icons, sortDirections } from '@/Helpers/Props';
import LoadingIndicator from '@/Components/Loading/LoadingIndicator';
import PageContent from '@/Components/Page/PageContent';
import PageContentBody from '@/Components/Page/PageContentBody';
import PageToolbar from '@/Components/Page/Toolbar/PageToolbar';
import PageToolbarButton from '@/Components/Page/Toolbar/PageToolbarButton';
import PageToolbarSeparator from '@/Components/Page/Toolbar/PageToolbarSeparator';
import PageToolbarSection from '@/Components/Page/Toolbar/PageToolbarSection';
import FilterMenu from '@/Components/Menu/FilterMenu';
import TableOptionsModalWrapper from '@/Components/Table/TableOptions/TableOptionsModalWrapper';
import Table from '@/Components/Table/Table';
import TableBody from '@/Components/Table/TableBody';
import NoComic from '@/Comic/NoComic';
import OrganizeComicModal from './Organize/OrganizeComicModal';
import ComicEditorRowConnector from './ComicEditorRowConnector';
import ComicEditorFooter from './ComicEditorFooter';
import ComicEditorFilterModalConnector from './ComicEditorFilterModalConnector';

class ComicEditor extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      allSelected: false,
      allUnselected: false,
      lastToggled: null,
      selectedState: {},
      isOrganizingComicModalOpen: false
    };
  }

  componentDidUpdate(prevProps) {
    const {
      isDeleting,
      deleteError
    } = this.props;

    const hasFinishedDeleting = prevProps.isDeleting &&
                                !isDeleting &&
                                !deleteError;

    if (hasFinishedDeleting) {
      this.onSelectAllChange({ value: false });
    }
  }

  //
  // Control

  getSelectedIds() {
    return getSelectedIds(this.state.selectedState);
  }

  //
  // Listeners

  onSelectAllChange({ value }) {
    this.setState(selectAll(this.state.selectedState, value));
  }

  onSelectedChange({ id, value, shiftKey = false }) {
    this.setState((state) => {
      return toggleSelected(state, this.props.items, id, value, shiftKey);
    });
  }

  onSaveSelected(changes) {
    this.props.onSaveSelected({
      comicIds: this.getSelectedIds(),
      ...changes
    });
  }

  onOrganizeComicPress() {
    this.setState({ isOrganizingComicModalOpen: true });
  }

  onOrganizeComicModalClose(organized) {
    this.setState({ isOrganizingComicModalOpen: false });

    if (organized === true) {
      this.onSelectAllChange({ value: false });
    }
  }

  //
  // Render

  render() {
    const {
      isFetching,
      isPopulated,
      error,
      totalItems,
      items,
      columns,
      selectedFilterKey,
      filters,
      customFilters,
      sortKey,
      sortDirection,
      isSaving,
      saveError,
      isDeleting,
      deleteError,
      isOrganizingComic,
      onTableOptionChange,
      onSortPress,
      onFilterSelect
    } = this.props;

    const {
      allSelected,
      allUnselected,
      selectedState
    } = this.state;

    const selectedComicIds = this.getSelectedIds();

    return (
      <PageContent title="Comic Editor">
        <PageToolbar>
          <PageToolbarSection />
          <PageToolbarSection alignContent={align.RIGHT}>
            <TableOptionsModalWrapper
              columns={columns}
              onTableOptionChange={onTableOptionChange}
            >
              <PageToolbarButton
                label="Options"
                iconName={icons.TABLE}
              />
            </TableOptionsModalWrapper>

            <PageToolbarSeparator />

            <FilterMenu
              alignMenu={align.RIGHT}
              selectedFilterKey={selectedFilterKey}
              filters={filters}
              customFilters={customFilters}
              filterModalConnectorComponent={ComicEditorFilterModalConnector}
              onFilterSelect={onFilterSelect}
            />
          </PageToolbarSection>
        </PageToolbar>

        <PageContentBody>
          {
            isFetching && !isPopulated &&
              <LoadingIndicator />
          }

          {
            !isFetching && !!error &&
              <div>Unable to load the calendar</div>
          }

          {
            !error && isPopulated && !!items.length &&
              <div>
                <Table
                  columns={columns}
                  sortKey={sortKey}
                  sortDirection={sortDirection}
                  selectAll={true}
                  allSelected={allSelected}
                  allUnselected={allUnselected}
                  onSortPress={onSortPress}
                  onSelectAllChange={this.onSelectAllChange}
                >
                  <TableBody>
                    {
                      items.map((item) => {
                        return (
                          <ComicEditorRowConnector
                            key={item.id}
                            {...item}
                            columns={columns}
                            isSelected={selectedState[item.id]}
                            onSelectedChange={this.onSelectedChange}
                          />
                        );
                      })
                    }
                  </TableBody>
                </Table>
              </div>
          }

          {
            !error && isPopulated && !items.length &&
              <NoComic totalItems={totalItems} />
          }
        </PageContentBody>

        <ComicEditorFooter
          comicIds={selectedComicIds}
          selectedCount={selectedComicIds.length}
          isSaving={isSaving}
          saveError={saveError}
          isDeleting={isDeleting}
          deleteError={deleteError}
          isOrganizingComic={isOrganizingComic}
          columns={columns}
          showLanguageProfile={columns.find((column) => column.name === 'languageProfileId').isVisible}
          onSaveSelected={this.onSaveSelected}
          onOrganizeComicPress={this.onOrganizeComicPress}
        />

        <OrganizeComicModal
          isOpen={this.state.isOrganizingComicModalOpen}
          comicIds={selectedComicIds}
          onModalClose={this.onOrganizeComicModalClose}
        />
      </PageContent>
    );
  }
}

ComicEditor.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  totalItems: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortKey: PropTypes.string,
  sortDirection: PropTypes.oneOf(sortDirections.all),
  selectedFilterKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  customFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  isDeleting: PropTypes.bool.isRequired,
  deleteError: PropTypes.object,
  isOrganizingComic: PropTypes.bool.isRequired,
  onTableOptionChange: PropTypes.func.isRequired,
  onSortPress: PropTypes.func.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  onSaveSelected: PropTypes.func.isRequired
};

export default ComicEditor;
