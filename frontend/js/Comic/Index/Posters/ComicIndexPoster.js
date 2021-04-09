import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getRelativeDate from 'Utilities/Date/getRelativeDate';
import { icons } from 'Helpers/Props';
import IconButton from 'Components/Link/IconButton';
import SpinnerIconButton from 'Components/Link/SpinnerIconButton';
import Label from 'Components/Label';
import Link from 'Components/Link/Link';
import ComicPoster from 'Comic/ComicPoster';
import EditComicModalConnector from 'Comic/Edit/EditComicModalConnector';
import DeleteComicModal from 'Comic/Delete/DeleteComicModal';
import ComicIndexProgressBar from 'Comic/Index/ProgressBar/ComicIndexProgressBar';
import ComicIndexPosterInfo from './ComicIndexPosterInfo';
import styles from './ComicIndexPoster.css';

class ComicIndexPoster extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      hasPosterError: false,
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

  onPosterLoad = () => {
    if (this.state.hasPosterError) {
      this.setState({ hasPosterError: false });
    }
  }

  onPosterLoadError = () => {
    if (!this.state.hasPosterError) {
      this.setState({ hasPosterError: true });
    }
  }

  //
  // Render

  render() {
    const {
      id,
      title,
      monitored,
      status,
      titleSlug,
      nextAiring,
      statistics,
      images,
      posterWidth,
      posterHeight,
      detailedProgressBar,
      showTitle,
      showMonitored,
      showQualityProfile,
      qualityProfile,
      showSearchAction,
      showRelativeDates,
      shortDateFormat,
      timeFormat,
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
      hasPosterError,
      isEditComicModalOpen,
      isDeleteComicModalOpen
    } = this.state;

    const link = `/comic/${titleSlug}`;

    const elementStyle = {
      width: `${posterWidth}px`,
      height: `${posterHeight}px`
    };

    return (
      <div className={styles.content}>
        <div className={styles.posterContainer}>
          <Label className={styles.controls}>
            <SpinnerIconButton
              className={styles.action}
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
              className={styles.action}
              name={icons.EDIT}
              title="Edit Comic"
              onPress={this.onEditComicPress}
            />
          </Label>

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
              style={elementStyle}
              images={images}
              size={250}
              lazy={false}
              overflow={true}
              onError={this.onPosterLoadError}
              onLoad={this.onPosterLoad}
            />

            {
              hasPosterError &&
                <div className={styles.overlayTitle}>
                  {title}
                </div>
            }
          </Link>
        </div>

        <ComicIndexProgressBar
          monitored={monitored}
          status={status}
          issueCount={issueCount}
          issueFileCount={issueFileCount}
          totalIssueCount={totalIssueCount}
          posterWidth={posterWidth}
          detailedProgressBar={detailedProgressBar}
        />

        {
          showTitle &&
            <div className={styles.title}>
              {title}
            </div>
        }

        {
          showMonitored &&
            <div className={styles.title}>
              {monitored ? 'Monitored' : 'Unmonitored'}
            </div>
        }

        {
          showQualityProfile &&
            <div className={styles.title}>
              {qualityProfile.name}
            </div>
        }

        {
          nextAiring &&
            <div className={styles.nextAiring}>
              {
                getRelativeDate(
                  nextAiring,
                  shortDateFormat,
                  showRelativeDates,
                  {
                    timeFormat,
                    timeForToday: true
                  }
                )
              }
            </div>
        }

        <ComicIndexPosterInfo
          seasonCount={seasonCount}
          sizeOnDisk={sizeOnDisk}
          qualityProfile={qualityProfile}
          showQualityProfile={showQualityProfile}
          showRelativeDates={showRelativeDates}
          shortDateFormat={shortDateFormat}
          timeFormat={timeFormat}
          {...otherProps}
        />

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

ComicIndexPoster.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  nextAiring: PropTypes.string,
  statistics: PropTypes.object.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  posterWidth: PropTypes.number.isRequired,
  posterHeight: PropTypes.number.isRequired,
  detailedProgressBar: PropTypes.bool.isRequired,
  showTitle: PropTypes.bool.isRequired,
  showMonitored: PropTypes.bool.isRequired,
  showQualityProfile: PropTypes.bool.isRequired,
  qualityProfile: PropTypes.object.isRequired,
  showSearchAction: PropTypes.bool.isRequired,
  showRelativeDates: PropTypes.bool.isRequired,
  shortDateFormat: PropTypes.string.isRequired,
  timeFormat: PropTypes.string.isRequired,
  isRefreshingComic: PropTypes.bool.isRequired,
  isSearchingComic: PropTypes.bool.isRequired,
  onRefreshComicPress: PropTypes.func.isRequired,
  onSearchPress: PropTypes.func.isRequired
};

ComicIndexPoster.defaultProps = {
  statistics: {
    seasonCount: 0,
    issueCount: 0,
    issueFileCount: 0,
    totalIssueCount: 0
  }
};

export default ComicIndexPoster;
