import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Truncate from 'react-truncate-html';
import { icons } from 'Helpers/Props';
import dimensions from 'Styles/Variables/dimensions';
import fonts from 'Styles/Variables/fonts';
import IconButton from 'Components/Link/IconButton';
import Link from 'Components/Link/Link';
import SpinnerIconButton from 'Components/Link/SpinnerIconButton';
import ComicPoster from 'Comic/ComicPoster';
import EditComicModalConnector from 'Comic/Edit/EditComicModalConnector';
import DeleteComicModal from 'Comic/Delete/DeleteComicModal';
import ComicIndexProgressBar from 'Comic/Index/ProgressBar/ComicIndexProgressBar';
import ComicIndexOverviewInfo from './ComicIndexOverviewInfo';
import styles from './ComicIndexOverview.css';

const columnPadding = parseInt(dimensions.comicIndexColumnPadding);
const columnPaddingSmallScreen = parseInt(dimensions.comicIndexColumnPaddingSmallScreen);
const defaultFontSize = parseInt(fonts.defaultFontSize);
const lineHeight = parseFloat(fonts.lineHeight);

// Hardcoded height beased on line-height of 32 + bottom margin of 10.
// Less side-effecty than using react-measure.
const titleRowHeight = 42;

function getContentHeight(rowHeight, isSmallScreen) {
  const padding = isSmallScreen ? columnPaddingSmallScreen : columnPadding;

  return rowHeight - padding;
}

class ComicIndexOverview extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isEditComicModalOpen: false,
      isDeleteComicModalOpen: false
    };
  }

  //
  // Listeners

  onEditComicPress = () => {
    this.setState({ isEditComicModalOpen: true });
  }

  onEditComicModalClose = () => {
    this.setState({ isEditComicModalOpen: false });
  }

  onDeleteComicPress = () => {
    this.setState({
      isEditComicModalOpen: false,
      isDeleteComicModalOpen: true
    });
  }

  onDeleteComicModalClose = () => {
    this.setState({ isDeleteComicModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      id,
      title,
      overview,
      monitored,
      status,
      titleSlug,
      nextAiring,
      statistics,
      images,
      posterWidth,
      posterHeight,
      qualityProfile,
      overviewOptions,
      showSearchAction,
      showRelativeDates,
      shortDateFormat,
      longDateFormat,
      timeFormat,
      rowHeight,
      isSmallScreen,
      isRefreshingComic,
      isSearchingComic,
      onRefreshComicPress,
      onSearchPress,
      ...otherProps
    } = this.props;

    const {
      seasonCount,
      issueCount,
      issueFileCount,
      totalIssueCount,
      sizeOnDisk
    } = statistics;

    const {
      isEditComicModalOpen,
      isDeleteComicModalOpen
    } = this.state;

    const link = `/comic/${titleSlug}`;

    const elementStyle = {
      width: `${posterWidth}px`,
      height: `${posterHeight}px`
    };

    const contentHeight = getContentHeight(rowHeight, isSmallScreen);
    const overviewHeight = contentHeight - titleRowHeight;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.poster}>
            <div className={styles.posterContainer}>
              {
                status === 'ended' &&
                <div
                  className={styles.ended}
                  title="Ended"
                />
              }

              <Link
                className={styles.link}
                style={elementStyle}
                to={link}
              >
                <ComicPoster
                  className={styles.poster}
                  style={elementStyle}
                  images={images}
                  size={250}
                  lazy={false}
                  overflow={true}
                />
              </Link>
            </div>

            <ComicIndexProgressBar
              monitored={monitored}
              status={status}
              issueCount={issueCount}
              issueFileCount={issueFileCount}
              totalIssueCount={totalIssueCount}
              posterWidth={posterWidth}
              detailedProgressBar={overviewOptions.detailedProgressBar}
            />
          </div>

          <div className={styles.info} style={{ maxHeight: contentHeight }}>
            <div className={styles.titleRow}>
              <Link
                className={styles.title}
                to={link}
              >
                {title}
              </Link>

              <div className={styles.actions}>
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
                      title="Search for monitored issues"
                      isSpinning={isSearchingComic}
                      onPress={onSearchPress}
                    />
                }

                <IconButton
                  name={icons.EDIT}
                  title="Edit Comic"
                  onPress={this.onEditComicPress}
                />
              </div>
            </div>

            <div className={styles.details}>
              <Link
                className={styles.overview}
                to={link}
              >
                <Truncate
                  lines={Math.floor(overviewHeight / (defaultFontSize * lineHeight))}
                  dangerouslySetInnerHTML={{__html: overview}}
                />
              </Link>

              <ComicIndexOverviewInfo
                height={overviewHeight}
                monitored={monitored}
                nextAiring={nextAiring}
                seasonCount={seasonCount}
                qualityProfile={qualityProfile}
                sizeOnDisk={sizeOnDisk}
                showRelativeDates={showRelativeDates}
                shortDateFormat={shortDateFormat}
                longDateFormat={longDateFormat}
                timeFormat={timeFormat}
                {...overviewOptions}
                {...otherProps}
              />
            </div>
          </div>
        </div>

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
      </div>
    );
  }
}

ComicIndexOverview.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  nextAiring: PropTypes.string,
  statistics: PropTypes.object.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  posterWidth: PropTypes.number.isRequired,
  posterHeight: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  qualityProfile: PropTypes.object.isRequired,
  overviewOptions: PropTypes.object.isRequired,
  showSearchAction: PropTypes.bool.isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  longDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  isRefreshingComic: PropTypes.bool.isRequired,
  isSearchingComic: PropTypes.bool.isRequired,
  onRefreshComicPress: PropTypes.func.isRequired,
  onSearchPress: PropTypes.func.isRequired
};

ComicIndexOverview.defaultProps = {
  statistics: {
    seasonCount: 0,
    issueCount: 0,
    issueFileCount: 0,
    totalIssueCount: 0
  }
};

export default ComicIndexOverview;
