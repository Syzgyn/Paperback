import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import formatBytes from '@/Utilities/Number/formatBytes';
import getProgressBarKind from '@/Utilities/Comic/getProgressBarKind';
import titleCase from '@/Utilities/String/titleCase';
import { icons } from '@/Helpers/Props';
import HeartRating from '@/Components/HeartRating';
import IconButton from '@/Components/Link/IconButton';
import Link from '@/Components/Link/Link';
import SpinnerIconButton from '@/Components/Link/SpinnerIconButton';
import ProgressBar from '@/Components/ProgressBar';
import TagListConnector from '@/Components/TagListConnector';
import CheckInput from '@/Components/Form/CheckInput';
import VirtualTableRowCell from '@/Components/Table/Cells/VirtualTableRowCell';
import RelativeDateCellConnector from '@/Components/Table/Cells/RelativeDateCellConnector';
import ComicTitleLink from '@/Comic/ComicTitleLink';
import EditComicModalConnector from '@/Comic/Edit/EditComicModalConnector';
import DeleteComicModal from '@/Comic/Delete/DeleteComicModal';
import ComicBanner from '@/Comic/ComicBanner';
import hasGrowableColumns from './hasGrowableColumns';
import ComicStatusCell from './ComicStatusCell';
import styles from './ComicIndexRow.module.scss';

class ComicIndexRow extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      hasBannerError: false,
      isEditComicModalOpen: false,
      isDeleteComicModalOpen: false
    };
  }

  onEditComicPress() {
    this.setState({ isEditComicModalOpen: true });
  }

  onEditComicModalClose() {
    this.setState({ isEditComicModalOpen: false });
  }

  onDeleteComicPress() {
    this.setState({
      isEditComicModalOpen: false,
      isDeleteComicModalOpen: true
    });
  }

  onDeleteComicModalClose() {
    this.setState({ isDeleteComicModalOpen: false });
  }

  onUseSceneNumberingChange() {
    // Mock handler to satisfy `onChange` being required for `CheckInput`.
    //
  }

  onBannerLoad() {
    if (this.state.hasBannerError) {
      this.setState({ hasBannerError: false });
    }
  }

  onBannerLoadError() {
    if (!this.state.hasBannerError) {
      this.setState({ hasBannerError: true });
    }
  }

  //
  // Render

  render() {
    const {
      id,
      monitored,
      status,
      title,
      titleSlug,
      comicType,
      network,
      qualityProfile,
      languageProfile,
      nextAiring,
      previousAiring,
      added,
      statistics,
      latestSeason,
      year,
      path,
      genres,
      ratings,
      certification,
      tags,
      images,
      useSceneNumbering,
      showBanners,
      showSearchAction,
      columns,
      isRefreshingComic,
      isSearchingComic,
      onRefreshComicPress,
      onSearchPress
    } = this.props;

    const {
      seasonCount,
      episodeCount,
      episodeFileCount,
      totalEpisodeCount,
      sizeOnDisk
    } = statistics;

    const {
      hasBannerError,
      isEditComicModalOpen,
      isDeleteComicModalOpen
    } = this.state;

    return (
      <>
        {
          columns.map((column) => {
            const {
              name,
              isVisible
            } = column;

            if (!isVisible) {
              return null;
            }

            if (name === 'status') {
              return (
                <ComicStatusCell
                  key={name}
                  className={styles[name]}
                  monitored={monitored}
                  status={status}
                  component={VirtualTableRowCell}
                />
              );
            }

            if (name === 'sortTitle') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={classNames(
                    styles[name],
                    showBanners && styles.banner,
                    showBanners && !hasGrowableColumns(columns) && styles.bannerGrow
                  )}
                >
                  {
                    showBanners ?
                      <Link
                        className={styles.link}
                        to={`/comic/${titleSlug}`}
                      >
                        <ComicBanner
                          className={styles.bannerImage}
                          images={images}
                          lazy={false}
                          overflow={true}
                          onError={this.onBannerLoadError}
                          onLoad={this.onBannerLoad}
                        />

                        {
                          hasBannerError &&
                            <div className={styles.overlayTitle}>
                              {title}
                            </div>
                        }
                      </Link> :

                      <ComicTitleLink
                        titleSlug={titleSlug}
                        title={title}
                      />
                  }
                </VirtualTableRowCell>
              );
            }

            if (name === 'comicType') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  {titleCase(comicType)}
                </VirtualTableRowCell>
              );
            }

            if (name === 'network') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  {network}
                </VirtualTableRowCell>
              );
            }

            if (name === 'qualityProfileId') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  {qualityProfile.name}
                </VirtualTableRowCell>
              );
            }

            if (name === 'languageProfileId') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  {languageProfile.name}
                </VirtualTableRowCell>
              );
            }

            if (name === 'nextAiring') {
              return (
                <RelativeDateCellConnector
                  key={name}
                  className={styles[name]}
                  date={nextAiring}
                  component={VirtualTableRowCell}
                />
              );
            }

            if (name === 'previousAiring') {
              return (
                <RelativeDateCellConnector
                  key={name}
                  className={styles[name]}
                  date={previousAiring}
                  component={VirtualTableRowCell}
                />
              );
            }

            if (name === 'added') {
              return (
                <RelativeDateCellConnector
                  key={name}
                  className={styles[name]}
                  date={added}
                  component={VirtualTableRowCell}
                />
              );
            }

            if (name === 'seasonCount') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  {seasonCount}
                </VirtualTableRowCell>
              );
            }

            if (name === 'episodeProgress') {
              const progress = episodeCount ? episodeFileCount / episodeCount * 100 : 100;

              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  <ProgressBar
                    progress={progress}
                    kind={getProgressBarKind(status, monitored, progress)}
                    showText={true}
                    text={`${episodeFileCount} / ${episodeCount}`}
                    title={`${episodeFileCount} / ${episodeCount} (Total: ${totalEpisodeCount})`}
                    width={125}
                  />
                </VirtualTableRowCell>
              );
            }

            if (name === 'latestSeason') {
              if (!latestSeason) {
                return (
                  <VirtualTableRowCell
                    key={name}
                    className={styles[name]}
                  />
                );
              }

              const seasonStatistics = latestSeason.statistics || {};
              const progress = seasonStatistics.episodeCount ?
                seasonStatistics.episodeFileCount / seasonStatistics.episodeCount * 100 :
                100;

              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  <ProgressBar
                    progress={progress}
                    kind={getProgressBarKind(status, monitored, progress)}
                    showText={true}
                    text={`${seasonStatistics.episodeFileCount} / ${seasonStatistics.episodeCount}`}
                    title={`${seasonStatistics.episodeFileCount} / ${seasonStatistics.episodeCount} (Total: ${seasonStatistics.totalEpisodeCount})`}
                    width={125}
                  />
                </VirtualTableRowCell>
              );
            }

            if (name === 'episodeCount') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  {totalEpisodeCount}
                </VirtualTableRowCell>
              );
            }

            if (name === 'year') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  {year}
                </VirtualTableRowCell>
              );
            }

            if (name === 'path') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  {path}
                </VirtualTableRowCell>
              );
            }

            if (name === 'sizeOnDisk') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  {formatBytes(sizeOnDisk)}
                </VirtualTableRowCell>
              );
            }

            if (name === 'genres') {
              const joinedGenres = genres.join(', ');

              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  <span title={joinedGenres}>
                    {joinedGenres}
                  </span>
                </VirtualTableRowCell>
              );
            }

            if (name === 'ratings') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  <HeartRating
                    rating={ratings.value}
                  />
                </VirtualTableRowCell>
              );
            }

            if (name === 'certification') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  {certification}
                </VirtualTableRowCell>
              );
            }

            if (name === 'tags') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  <TagListConnector
                    tags={tags}
                  />
                </VirtualTableRowCell>
              );
            }

            if (name === 'useSceneNumbering') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  <CheckInput
                    className={styles.checkInput}
                    name="useSceneNumbering"
                    value={useSceneNumbering}
                    isDisabled={true}
                    onChange={this.onUseSceneNumberingChange}
                  />
                </VirtualTableRowCell>
              );
            }

            if (name === 'actions') {
              return (
                <VirtualTableRowCell
                  key={name}
                  className={styles[name]}
                >
                  <SpinnerIconButton
                    name={icons.REFRESH}
                    title="Refresh comic"
                    isSpinning={isRefreshingComic}
                    onPress={onRefreshComicPress}
                  />

                  {
                    showSearchAction &&
                      <SpinnerIconButton
                        className={styles.action}
                        name={icons.SEARCH}
                        title="Search for monitored episodes"
                        isSpinning={isSearchingComic}
                        onPress={onSearchPress}
                      />
                  }

                  <IconButton
                    name={icons.EDIT}
                    title="Edit Comic"
                    onPress={this.onEditComicPress}
                  />
                </VirtualTableRowCell>
              );
            }

            return null;
          })
        }

        <EditComicModalConnector
          isOpen={isEditComicModalOpen}
          comicId={id}
          onModalClose={this.onEditComicModalClose}
          onDeleteComicPress={this.onDeleteComicPress}
        />

        <DeleteComicModal
          isOpen={isDeleteComicModalOpen}
          comicId={id}
          onModalClose={this.onDeleteComicModalClose}
        />
      </>
    );
  }
}

ComicIndexRow.propTypes = {
  id: PropTypes.number.isRequired,
  monitored: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  comicType: PropTypes.string.isRequired,
  network: PropTypes.string,
  qualityProfile: PropTypes.object.isRequired,
  languageProfile: PropTypes.object.isRequired,
  nextAiring: PropTypes.string,
  previousAiring: PropTypes.string,
  added: PropTypes.string,
  statistics: PropTypes.object.isRequired,
  latestSeason: PropTypes.object,
  year: PropTypes.number,
  path: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  ratings: PropTypes.object.isRequired,
  certification: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.number).isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  useSceneNumbering: PropTypes.bool.isRequired,
  showBanners: PropTypes.bool.isRequired,
  showSearchAction: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  isRefreshingComic: PropTypes.bool.isRequired,
  isSearchingComic: PropTypes.bool.isRequired,
  onRefreshComicPress: PropTypes.func.isRequired,
  onSearchPress: PropTypes.func.isRequired
};

ComicIndexRow.defaultProps = {
  statistics: {
    seasonCount: 0,
    episodeCount: 0,
    episodeFileCount: 0,
    totalEpisodeCount: 0
  },
  genres: [],
  tags: []
};

export default ComicIndexRow;
