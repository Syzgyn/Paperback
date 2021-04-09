import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import hasDifferentItemsOrOrder from 'Utilities/Object/hasDifferentItemsOrOrder';
import { align, icons, sortDirections } from 'Helpers/Props';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageJumpBar from 'Components/Page/PageJumpBar';
import TableOptionsModalWrapper from 'Components/Table/TableOptions/TableOptionsModalWrapper';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSeparator from 'Components/Page/Toolbar/PageToolbarSeparator';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import NoComic from 'Comic/NoComic';
import ComicIndexTableConnector from './Table/ComicIndexTableConnector';
import ComicIndexTableOptionsConnector from './Table/ComicIndexTableOptionsConnector';
import ComicIndexPosterOptionsModal from './Posters/Options/ComicIndexPosterOptionsModal';
import ComicIndexPostersConnector from './Posters/ComicIndexPostersConnector';
import ComicIndexOverviewOptionsModal from './Overview/Options/ComicIndexOverviewOptionsModal';
import ComicIndexOverviewsConnector from './Overview/ComicIndexOverviewsConnector';
import ComicIndexFilterMenu from './Menus/ComicIndexFilterMenu';
import ComicIndexSortMenu from './Menus/ComicIndexSortMenu';
import ComicIndexViewMenu from './Menus/ComicIndexViewMenu';
import ComicIndexFooterConnector from './ComicIndexFooterConnector';
import styles from './ComicIndex.css';

function getViewComponent(view) {
  if (view === 'posters') {
    return ComicIndexPostersConnector;
  }

  if (view === 'overview') {
    return ComicIndexOverviewsConnector;
  }

  return ComicIndexTableConnector;
}

class ComicIndex extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      scroller: null,
      jumpBarItems: { order: [] },
      jumpToCharacter: null,
      isPosterOptionsModalOpen: false,
      isOverviewOptionsModalOpen: false
    };
  }

  componentDidMount() {
    this.setJumpBarItems();
  }

  componentDidUpdate(prevProps) {
    const {
      items,
      sortKey,
      sortDirection
    } = this.props;

    if (sortKey !== prevProps.sortKey ||
        sortDirection !== prevProps.sortDirection ||
        hasDifferentItemsOrOrder(prevProps.items, items)
    ) {
      this.setJumpBarItems();
    }

    if (this.state.jumpToCharacter != null) {
      this.setState({ jumpToCharacter: null });
    }
  }

  //
  // Control

  setScrollerRef = (ref) => {
    this.setState({ scroller: ref });
  }

  setJumpBarItems() {
    const {
      items,
      sortKey,
      sortDirection
    } = this.props;

    // Reset if not sorting by sortTitle
    if (sortKey !== 'sortTitle') {
      this.setState({ jumpBarItems: { order: [] } });
      return;
    }

    const characters = _.reduce(items, (acc, item) => {
      let char = item.sortTitle.charAt(0);

      if (!isNaN(char)) {
        char = '#';
      }

      if (char in acc) {
        acc[char] = acc[char] + 1;
      } else {
        acc[char] = 1;
      }

      return acc;
    }, {});

    const order = Object.keys(characters).sort();

    // Reverse if sorting descending
    if (sortDirection === sortDirections.DESCENDING) {
      order.reverse();
    }

    const jumpBarItems = {
      characters,
      order
    };

    this.setState({ jumpBarItems });
  }

  //
  // Listeners

  onPosterOptionsPress = () => {
    this.setState({ isPosterOptionsModalOpen: true });
  }

  onPosterOptionsModalClose = () => {
    this.setState({ isPosterOptionsModalOpen: false });
  }

  onOverviewOptionsPress = () => {
    this.setState({ isOverviewOptionsModalOpen: true });
  }

  onOverviewOptionsModalClose = () => {
    this.setState({ isOverviewOptionsModalOpen: false });
  }

  onJumpBarItemPress = (jumpToCharacter) => {
    this.setState({ jumpToCharacter });
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
      view,
      isRefreshingComic,
      isRssSyncExecuting,
      onScroll,
      onSortSelect,
      onFilterSelect,
      onViewSelect,
      onRefreshComicPress,
      onRssSyncPress,
      ...otherProps
    } = this.props;

    const {
      scroller,
      jumpBarItems,
      jumpToCharacter,
      isPosterOptionsModalOpen,
      isOverviewOptionsModalOpen
    } = this.state;

    const ViewComponent = getViewComponent(view);
    const isLoaded = !!(!error && isPopulated && items.length && scroller);
    const hasNoComic = !totalItems;

    return (
      <PageContent>
        <PageToolbar>
          <PageToolbarSection>
            <PageToolbarButton
              label="Update all"
              iconName={icons.REFRESH}
              spinningName={icons.REFRESH}
              isSpinning={isRefreshingComic}
              isDisabled={hasNoComic}
              onPress={onRefreshComicPress}
            />

            <PageToolbarButton
              label="RSS Sync"
              iconName={icons.RSS}
              isSpinning={isRssSyncExecuting}
              isDisabled={hasNoComic}
              onPress={onRssSyncPress}
            />

          </PageToolbarSection>

          <PageToolbarSection
            alignContent={align.RIGHT}
            collapseButtons={false}
          >
            {
              view === 'table' ?
                <TableOptionsModalWrapper
                  {...otherProps}
                  columns={columns}
                  optionsComponent={ComicIndexTableOptionsConnector}
                >
                  <PageToolbarButton
                    label="Options"
                    iconName={icons.TABLE}
                  />
                </TableOptionsModalWrapper> :
                null
            }

            {
              view === 'posters' ?
                <PageToolbarButton
                  label="Options"
                  iconName={icons.POSTER}
                  isDisabled={hasNoComic}
                  onPress={this.onPosterOptionsPress}
                /> :
                null
            }

            {
              view === 'overview' ?
                <PageToolbarButton
                  label="Options"
                  iconName={icons.OVERVIEW}
                  isDisabled={hasNoComic}
                  onPress={this.onOverviewOptionsPress}
                /> :
                null
            }

            <PageToolbarSeparator />

            <ComicIndexViewMenu
              view={view}
              isDisabled={hasNoComic}
              onViewSelect={onViewSelect}
            />

            <ComicIndexSortMenu
              sortKey={sortKey}
              sortDirection={sortDirection}
              isDisabled={hasNoComic}
              onSortSelect={onSortSelect}
            />

            <ComicIndexFilterMenu
              selectedFilterKey={selectedFilterKey}
              filters={filters}
              customFilters={customFilters}
              isDisabled={hasNoComic}
              onFilterSelect={onFilterSelect}
            />
          </PageToolbarSection>
        </PageToolbar>

        <div className={styles.pageContentBodyWrapper}>
          <PageContentBody
            registerScroller={this.setScrollerRef}
            className={styles.contentBody}
            innerClassName={styles[`${view}InnerContentBody`]}
            onScroll={onScroll}
          >
            {
              isFetching && !isPopulated &&
                <LoadingIndicator />
            }

            {
              !isFetching && !!error &&
                <div>Unable to load comic</div>
            }

            {
              isLoaded &&
                <div className={styles.contentBodyContainer}>
                  <ViewComponent
                    scroller={scroller}
                    items={items}
                    filters={filters}
                    sortKey={sortKey}
                    sortDirection={sortDirection}
                    jumpToCharacter={jumpToCharacter}
                    {...otherProps}
                  />

                  <ComicIndexFooterConnector />
                </div>
            }

            {
              !error && isPopulated && !items.length &&
                <NoComic totalItems={totalItems} />
            }
          </PageContentBody>

          {
            isLoaded && !!jumpBarItems.order.length &&
              <PageJumpBar
                items={jumpBarItems}
                onItemPress={this.onJumpBarItemPress}
              />
          }
        </div>

        <ComicIndexPosterOptionsModal
          isOpen={isPosterOptionsModalOpen}
          onModalClose={this.onPosterOptionsModalClose}
        />

        <ComicIndexOverviewOptionsModal
          isOpen={isOverviewOptionsModalOpen}
          onModalClose={this.onOverviewOptionsModalClose}
        />
      </PageContent>
    );
  }
}

ComicIndex.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  error: PropTypes.object,
  totalItems: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFilterKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  customFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortKey: PropTypes.string,
  sortDirection: PropTypes.oneOf(sortDirections.all),
  view: PropTypes.string.isRequired,
  isRefreshingComic: PropTypes.bool.isRequired,
  isRssSyncExecuting: PropTypes.bool.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  onSortSelect: PropTypes.func.isRequired,
  onFilterSelect: PropTypes.func.isRequired,
  onViewSelect: PropTypes.func.isRequired,
  onRefreshComicPress: PropTypes.func.isRequired,
  onRssSyncPress: PropTypes.func.isRequired,
  onScroll: PropTypes.func.isRequired
};

export default ComicIndex;
