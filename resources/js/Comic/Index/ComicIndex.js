import _ from "lodash";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { align, icons, sortDirections } from '@/Helpers/Props';
import LoadingIndicator from "@/Components/Loading/LoadingIndicator";
import PageContent from "@/Components/Page/PageContent";
import PageContentBody from "@/Components/Page/PageContentBody";
import PageJumpBar from "@/Components/Page/PageJumpBar";
import PageToolbar from "@/Components/Page/Toolbar/PageToolbar";
import PageToolbarSeparator from "@/Components/Page/Toolbar/PageToolbarSeparator";
import PageToolbarSection from "@/Components/Page/Toolbar/PageToolbarSection";
import PageToolbarButton from "@/Components/Page/Toolbar/PageToolbarButton";
import NoComic from "@/Comic/NoComic";
import ComicIndexTable from '@/Comic/Index/Table/ComicIndexTable';
import ComicIndexTableOptions from '@/Comic/Index/Table/ComicIndexTableOptions';
import ComicIndexPosterOptionsModal from '@/Comic/Index/Posters/Options/ComicIndexPosterOptionsModal';
import ComicIndexPosters from '@/Comic/Index/Posters/ComicIndexPosters';
import ComicIndexOverviewOptionsModal from '@/Comic/Index/Overview/Options/ComicIndexOverviewOptionsModal';
import ComicIndexOverviews from '@/Comic/Index/Overview/ComicIndexOverviews';
import ComicIndexFilterMenu from '@/Comic/Index/Menus/ComicIndexFilterMenu';
import ComicIndexSortMenu from '@/Comic/Index/Menus/ComicIndexSortMenu';
import ComicIndexViewMenu from '@/Comic/Index/Menus/ComicIndexViewMenu';
import ComicIndexFooter from '@/Comic/Index/ComicIndexFooter';
import { useSelector } from "react-redux";
import { sortedComicsSelector } from "@/Store/Slices/comics";
import styles from "./ComicIndex.module.scss";

const ComicIndex = (props) => {
    const [scroller, setScroller] = useState(null);
    const [jumpBarItems, setJumpBarItemsState] = useState({ order: [] });
    const [jumpToCharacter, setJumpToCharacter] = useState(null);
    const [isPosterOptionModalOpen, setIsPosterOptionModalOpen] = useState(false);
    const [isOverviewOptionModalOpen, setIsOverviewOptionModalOpen] = useState(false);

    const { items: comics, isLoading, isPopulated, view, sortKey, sortDir } = useSelector(
        sortedComicsSelector
    );

    useEffect(() => {
		setJumpBarItems();

		if (jumpToCharacter != null) {
            setJumpToCharacter(null);
		}
    }, [comics, sortKey, sortDir]);

	const getViewComponent = (view) => {
        if (view === 'posters') {
            return ComicIndexPosters;
        }

        if (view === 'posters') {
            return ComicIndexOverviews;
        }

        return ComicIndexTable;
	}
	return null;

    const setJumpBarItems = () => {
        if (sortKey !== 'sortName') {
            setJumpBarItemsState({  order: [] });
            return;
        }

        const characters = _.reduce(comics, (acc, comic) => {
            let char = comic.name.charAt(0);

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

        if (sortDir === sortDirections.DESCENDING) {
            order.reverse();
        }

        const jumpBarItems = {
            characters,
            order
        }

        setJumpBarItemsState(jumpBarItems);
    }

    const ViewComponent = getViewComponent(view);

    return (
		<PageContent>
			<PageToolbar>
			  <PageToolbarSection>
				<PageToolbarButton
				  label="Update all"
				  iconName={icons.REFRESH}
				  spinningName={icons.REFRESH}
				  isSpinning={isRefreshingSeries}
				  isDisabled={hasNoSeries}
				  onPress={onRefreshSeriesPress}
				/>

				<PageToolbarButton
				  label="RSS Sync"
				  iconName={icons.RSS}
				  isSpinning={isRssSyncExecuting}
				  isDisabled={hasNoSeries}
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
					  optionsComponent={SeriesIndexTableOptionsConnector}
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
					  isDisabled={hasNoSeries}
					  onPress={() => { setIsPosterOptionModalOpen(true); }}
					/> :
					null
				}

				{
				  view === 'overview' ?
					<PageToolbarButton
					  label="Options"
					  iconName={icons.OVERVIEW}
					  isDisabled={hasNoSeries}
					  onPress={() => { setIsOverviewOptionModalOpen(true); }}
					/> :
					null
				}

				<PageToolbarSeparator />

				<SeriesIndexViewMenu
				  view={view}
				  isDisabled={hasNoSeries}
				  onViewSelect={onViewSelect}
				/>

				<SeriesIndexSortMenu
				  sortKey={sortKey}
				  sortDirection={sortDirection}
				  isDisabled={hasNoSeries}
				  onSortSelect={onSortSelect}
				/>

				<SeriesIndexFilterMenu
				  selectedFilterKey={selectedFilterKey}
				  filters={filters}
				  customFilters={customFilters}
				  isDisabled={hasNoSeries}
				  onFilterSelect={onFilterSelect}
				/>
			  </PageToolbarSection>
			</PageToolbar>

			<div className={styles.pageContentBodyWrapper}>
			  <PageContentBody
				registerScroller={setScrollerRef}
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
					<div>Unable to load series</div>
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

					  <SeriesIndexFooterConnector />
					</div>
				}

				{
				  !error && isPopulated && !items.length &&
					<NoSeries totalItems={totalItems} />
				}
			  </PageContentBody>

			  {
				isLoaded && !!jumpBarItems.order.length &&
				  <PageJumpBar
					items={jumpBarItems}
					onItemPress={setJumpToCharacter}
				  />
			  }
			</div>

			<SeriesIndexPosterOptionsModal
			  isOpen={isPosterOptionsModalOpen}
		 	  onModalClose={() => { setIsPosterOptionModalOpen(false); }}
			/>

			<SeriesIndexOverviewOptionsModal
			  isOpen={isOverviewOptionsModalOpen}
		 	  onModalClose={() => { setIsOverviewOptionModalOpen(false); }}
			/>
      	</PageContent>
    );
};

export default ComicIndex;
