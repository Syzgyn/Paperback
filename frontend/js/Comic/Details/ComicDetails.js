import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextTruncate from 'react-text-truncate';
import formatBytes from 'Utilities/Number/formatBytes';
import selectAll from 'Utilities/Table/selectAll';
import toggleSelected from 'Utilities/Table/toggleSelected';
import { align, icons, kinds, sizes, tooltipPositions } from 'Helpers/Props';
import fonts from 'Styles/Variables/fonts';
import HeartRating from 'Components/HeartRating';
import Icon from 'Components/Icon';
import IconButton from 'Components/Link/IconButton';
import Label from 'Components/Label';
import Measure from 'Components/Measure';
import MonitorToggleButton from 'Components/MonitorToggleButton';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import PageContent from 'Components/Page/PageContent';
import PageContentBody from 'Components/Page/PageContentBody';
import PageToolbar from 'Components/Page/Toolbar/PageToolbar';
import PageToolbarSection from 'Components/Page/Toolbar/PageToolbarSection';
import PageToolbarSeparator from 'Components/Page/Toolbar/PageToolbarSeparator';
import PageToolbarButton from 'Components/Page/Toolbar/PageToolbarButton';
import Popover from 'Components/Tooltip/Popover';
import Tooltip from 'Components/Tooltip/Tooltip';
import IssueFileEditorModal from 'IssueFile/Editor/IssueFileEditorModal';
import InteractiveImportModal from 'InteractiveImport/InteractiveImportModal';
import OrganizePreviewModalConnector from 'Organize/OrganizePreviewModalConnector';
import QualityProfileNameConnector from 'Settings/Profiles/Quality/QualityProfileNameConnector';
import ComicPoster from 'Comic/ComicPoster';
import EditComicModalConnector from 'Comic/Edit/EditComicModalConnector';
import DeleteComicModal from 'Comic/Delete/DeleteComicModal';
import ComicHistoryModal from 'Comic/History/ComicHistoryModal';
import ComicAlternateTitles from './ComicAlternateTitles';
import ComicDetailsSeasonConnector from './ComicDetailsSeasonConnector';
import ComicTagsConnector from './ComicTagsConnector';
import ComicDetailsLinks from './ComicDetailsLinks';
import MonitoringOptionsModal from 'Comic/MonitoringOptions/MonitoringOptionsModal';
import { getComicStatusDetails } from 'Comic/ComicStatus';
import styles from './ComicDetails.css';

const defaultFontSize = parseInt(fonts.defaultFontSize);
const lineHeight = parseFloat(fonts.lineHeight);

function getFanartUrl(images) {
  const fanartImage = _.find(images, { coverType: 'fanart' });
  if (fanartImage) {
    // Remove protocol
    return fanartImage.url.replace(/^https?:/, '');
  }
}

function getExpandedState(newState) {
  return {
    allExpanded: newState.allSelected,
    allCollapsed: newState.allUnselected,
    expandedState: newState.selectedState
  };
}

class ComicDetails extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isOrganizeModalOpen: false,
      isManageIssuesOpen: false,
      isEditComicModalOpen: false,
      isDeleteComicModalOpen: false,
      isComicHistoryModalOpen: false,
      isInteractiveImportModalOpen: false,
      isMonitorOptionsModalOpen: false,
      allExpanded: false,
      allCollapsed: false,
      expandedState: {},
      overviewHeight: 0
    };
  }

  //
  // Listeners

  onOrganizePress = () => {
    this.setState({ isOrganizeModalOpen: true });
  }

  onOrganizeModalClose = () => {
    this.setState({ isOrganizeModalOpen: false });
  }

  onManageIssuesPress = () => {
    this.setState({ isManageIssuesOpen: true });
  }

  onManageIssuesModalClose = () => {
    this.setState({ isManageIssuesOpen: false });
  }

  onInteractiveImportPress = () => {
    this.setState({ isInteractiveImportModalOpen: true });
  }

  onInteractiveImportModalClose = () => {
    this.setState({ isInteractiveImportModalOpen: false });
  }

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

  onComicHistoryPress = () => {
    this.setState({ isComicHistoryModalOpen: true });
  }

  onComicHistoryModalClose = () => {
    this.setState({ isComicHistoryModalOpen: false });
  }

  onMonitorOptionsPress = () => {
    this.setState({ isMonitorOptionsModalOpen: true });
  }

  onMonitorOptionsClose = () => {
    this.setState({ isMonitorOptionsModalOpen: false });
  }

  onExpandAllPress = () => {
    const {
      allExpanded,
      expandedState
    } = this.state;

    this.setState(getExpandedState(selectAll(expandedState, !allExpanded)));
  }

  onExpandPress = (seasonNumber, isExpanded) => {
    this.setState((state) => {
      const convertedState = {
        allSelected: state.allExpanded,
        allUnselected: state.allCollapsed,
        selectedState: state.expandedState
      };

      const newState = toggleSelected(convertedState, [], seasonNumber, isExpanded, false);

      return getExpandedState(newState);
    });
  }

  onMeasure = ({ height }) => {
    this.setState({ overviewHeight: height });
  }

  //
  // Render

  render() {
    const {
      id,
      tvdbId,
      tvMazeId,
      imdbId,
      title,
      runtime,
      ratings,
      path,
      statistics,
      qualityProfileId,
      monitored,
      status,
      network,
      overview,
      images,
      seasons,
      alternateTitles,
      tags,
      isSaving,
      isRefreshing,
      isSearching,
      isFetching,
      isPopulated,
      issuesError,
      issueFilesError,
      hasIssues,
      hasMonitoredIssues,
      hasIssueFiles,
      previousComic,
      nextComic,
      onMonitorTogglePress,
      onRefreshPress,
      onSearchPress
    } = this.props;

    const {
      issueFileCount,
      sizeOnDisk
    } = statistics;

    const {
      isOrganizeModalOpen,
      isManageIssuesOpen,
      isEditComicModalOpen,
      isDeleteComicModalOpen,
      isComicHistoryModalOpen,
      isInteractiveImportModalOpen,
      isMonitorOptionsModalOpen,
      allExpanded,
      allCollapsed,
      expandedState,
      overviewHeight
    } = this.state;

    const statusDetails = getComicStatusDetails(status);

    let issueFilesCountMessage = 'No issue files';

    if (issueFileCount === 1) {
      issueFilesCountMessage = '1 issue file';
    } else if (issueFileCount > 1) {
      issueFilesCountMessage = `${issueFileCount} issue files`;
    }

    let expandIcon = icons.EXPAND_INDETERMINATE;

    if (allExpanded) {
      expandIcon = icons.COLLAPSE;
    } else if (allCollapsed) {
      expandIcon = icons.EXPAND;
    }

    return (
      <PageContent title={title}>
        <PageToolbar>
          <PageToolbarSection>
            <PageToolbarButton
              label="Refresh & Scan"
              iconName={icons.REFRESH}
              spinningName={icons.REFRESH}
              title="Refresh information and scan disk"
              isSpinning={isRefreshing}
              onPress={onRefreshPress}
            />

            <PageToolbarButton
              label="Search Monitored"
              iconName={icons.SEARCH}
              isDisabled={!monitored || !hasMonitoredIssues || !hasIssues}
              isSpinning={isSearching}
              title={hasMonitoredIssues ? undefined : 'No monitored issues in this comic'}
              onPress={onSearchPress}
            />

            <PageToolbarSeparator />

            <PageToolbarButton
              label="Preview Rename"
              iconName={icons.ORGANIZE}
              isDisabled={!hasIssueFiles}
              onPress={this.onOrganizePress}
            />

            <PageToolbarButton
              label="Manage Issues"
              iconName={icons.ISSUE_FILE}
              isDisabled={!hasIssueFiles}
              onPress={this.onManageIssuesPress}
            />

            <PageToolbarButton
              label="History"
              iconName={icons.HISTORY}
              isDisabled={!hasIssues}
              onPress={this.onComicHistoryPress}
            />

            <PageToolbarButton
              label="Manual File Import"
              iconName={icons.INTERACTIVE}
              onPress={this.onInteractiveImportPress}
            />

            <PageToolbarSeparator />

            <PageToolbarButton
              label="Comic Monitoring"
              iconName={icons.MONITORED}
              onPress={this.onMonitorOptionsPress}
            />

            <PageToolbarButton
              label="Edit"
              iconName={icons.EDIT}
              onPress={this.onEditComicPress}
            />

            <PageToolbarButton
              label="Delete"
              iconName={icons.DELETE}
              onPress={this.onDeleteComicPress}
            />

          </PageToolbarSection>

          <PageToolbarSection alignContent={align.RIGHT}>
            <PageToolbarButton
              label={allExpanded ? 'Collapse All' : 'Expand All'}
              iconName={expandIcon}
              onPress={this.onExpandAllPress}
            />
          </PageToolbarSection>
        </PageToolbar>

        <PageContentBody innerClassName={styles.innerContentBody}>
          <div className={styles.header}>
            <div
              className={styles.backdrop}
              style={{
                backgroundImage: `url(${getFanartUrl(images)})`
              }}
            >
              <div className={styles.backdropOverlay} />
            </div>

            <div className={styles.headerContent}>
              <ComicPoster
                className={styles.poster}
                images={images}
                size={500}
                lazy={false}
              />

              <div className={styles.info}>
                <div className={styles.titleRow}>
                  <div className={styles.titleContainer}>
                    <div className={styles.toggleMonitoredContainer}>
                      <MonitorToggleButton
                        className={styles.monitorToggleButton}
                        monitored={monitored}
                        isSaving={isSaving}
                        size={40}
                        onPress={onMonitorTogglePress}
                      />
                    </div>

                    <div className={styles.title}>
                      {title}
                    </div>

                    {
                      !!alternateTitles.length &&
                        <div className={styles.alternateTitlesIconContainer}>
                          <Popover
                            anchor={
                              <Icon
                                name={icons.ALTERNATE_TITLES}
                                size={20}
                              />
                            }
                            title="Alternate Titles"
                            body={<ComicAlternateTitles alternateTitles={alternateTitles} />}
                            position={tooltipPositions.BOTTOM}
                          />
                        </div>
                    }
                  </div>

                  <div className={styles.comicNavigationButtons}>
                    <IconButton
                      className={styles.comicNavigationButton}
                      name={icons.ARROW_LEFT}
                      size={30}
                      title={`Go to ${previousComic.title}`}
                      to={`/comic/${previousComic.titleSlug}`}
                    />

                    <IconButton
                      className={styles.comicNavigationButton}
                      name={icons.ARROW_RIGHT}
                      size={30}
                      title={`Go to ${nextComic.title}`}
                      to={`/comic/${nextComic.titleSlug}`}
                    />
                  </div>
                </div>

                <div className={styles.details}>
                  <div>
                    {
                      !!runtime &&
                        <span className={styles.runtime}>
                          {runtime} Minutes
                        </span>
                    }

                    <HeartRating
                      rating={ratings.value}
                      iconSize={20}
                    />
                  </div>
                </div>

                <div className={styles.detailsLabels}>
                  <Label
                    className={styles.detailsLabel}
                    size={sizes.LARGE}
                  >
                    <Icon
                      name={icons.FOLDER}
                      size={17}
                    />

                    <span className={styles.path}>
                      {path}
                    </span>
                  </Label>

                  <Tooltip
                    anchor={
                      <Label
                        className={styles.detailsLabel}
                        size={sizes.LARGE}
                      >
                        <Icon
                          name={icons.DRIVE}
                          size={17}
                        />

                        <span className={styles.sizeOnDisk}>
                          {
                            formatBytes(sizeOnDisk || 0)
                          }
                        </span>
                      </Label>
                    }
                    tooltip={
                      <span>
                        {issueFilesCountMessage}
                      </span>
                    }
                    kind={kinds.INVERSE}
                    position={tooltipPositions.BOTTOM}
                  />

                  <Label
                    className={styles.detailsLabel}
                    title="Quality Profile"
                    size={sizes.LARGE}
                  >
                    <Icon
                      name={icons.PROFILE}
                      size={17}
                    />

                    <span className={styles.qualityProfileName}>
                      {
                        <QualityProfileNameConnector
                          qualityProfileId={qualityProfileId}
                        />
                      }
                    </span>
                  </Label>

                  <Label
                    className={styles.detailsLabel}
                    size={sizes.LARGE}
                  >
                    <Icon
                      name={monitored ? icons.MONITORED : icons.UNMONITORED}
                      size={17}
                    />

                    <span className={styles.qualityProfileName}>
                      {monitored ? 'Monitored' : 'Unmonitored'}
                    </span>
                  </Label>

                  <Label
                    className={styles.detailsLabel}
                    title={statusDetails.message}
                    size={sizes.LARGE}
                  >
                    <Icon
                      name={statusDetails.icon}
                      size={17}
                    />

                    <span className={styles.qualityProfileName}>
                      {statusDetails.title}
                    </span>
                  </Label>

                  {
                    !!network &&
                      <Label
                        className={styles.detailsLabel}
                        title="Network"
                        size={sizes.LARGE}
                      >
                        <Icon
                          name={icons.NETWORK}
                          size={17}
                        />

                        <span className={styles.qualityProfileName}>
                          {network}
                        </span>
                      </Label>
                  }

                  <Tooltip
                    anchor={
                      <Label
                        className={styles.detailsLabel}
                        size={sizes.LARGE}
                      >
                        <Icon
                          name={icons.EXTERNAL_LINK}
                          size={17}
                        />

                        <span className={styles.links}>
                          Links
                        </span>
                      </Label>
                    }
                    tooltip={
                      <ComicDetailsLinks
                        tvdbId={tvdbId}
                        tvMazeId={tvMazeId}
                        imdbId={imdbId}
                      />
                    }
                    kind={kinds.INVERSE}
                    position={tooltipPositions.BOTTOM}
                  />

                  {
                    !!tags.length &&
                      <Tooltip
                        anchor={
                          <Label
                            className={styles.detailsLabel}
                            size={sizes.LARGE}
                          >
                            <Icon
                              name={icons.TAGS}
                              size={17}
                            />

                            <span className={styles.tags}>
                              Tags
                            </span>
                          </Label>
                        }
                        tooltip={<ComicTagsConnector comicId={id} />}
                        kind={kinds.INVERSE}
                        position={tooltipPositions.BOTTOM}
                      />

                  }
                </div>

                <Measure onMeasure={this.onMeasure}>
                  <div className={styles.overview}>
                    <TextTruncate
                      line={Math.floor(overviewHeight / (defaultFontSize * lineHeight))}
                      text={overview}
                    />
                  </div>
                </Measure>
              </div>
            </div>
          </div>

          <div className={styles.contentContainer}>
            {
              !isPopulated && !issuesError && !issueFilesError &&
                <LoadingIndicator />
            }

            {
              !isFetching && issuesError &&
                <div>Loading issues failed</div>
            }

            {
              !isFetching && issueFilesError &&
                <div>Loading issue files failed</div>
            }

            {
              isPopulated && !!seasons.length &&
                <div>
                  {
                    seasons.slice(0).reverse().map((season) => {
                      return (
                        <ComicDetailsSeasonConnector
                          key={season.seasonNumber}
                          comicId={id}
                          {...season}
                          isExpanded={expandedState[season.seasonNumber]}
                          onExpandPress={this.onExpandPress}
                        />
                      );
                    })
                  }
                </div>
            }

            {
              isPopulated && !seasons.length &&
                <div>
                  No issue information is available.
                </div>
            }

          </div>

          <OrganizePreviewModalConnector
            isOpen={isOrganizeModalOpen}
            comicId={id}
            onModalClose={this.onOrganizeModalClose}
          />

          <IssueFileEditorModal
            isOpen={isManageIssuesOpen}
            comicId={id}
            onModalClose={this.onManageIssuesModalClose}
          />

          <ComicHistoryModal
            isOpen={isComicHistoryModalOpen}
            comicId={id}
            onModalClose={this.onComicHistoryModalClose}
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

          <InteractiveImportModal
            isOpen={isInteractiveImportModalOpen}
            comicId={id}
            folder={path}
            allowComicChange={false}
            showFilterExistingFiles={true}
            showImportMode={false}
            onModalClose={this.onInteractiveImportModalClose}
          />

          <MonitoringOptionsModal
            isOpen={isMonitorOptionsModalOpen}
            comicId={id}
            onModalClose={this.onMonitorOptionsClose}
          />
        </PageContentBody>
      </PageContent>
    );
  }
}

ComicDetails.propTypes = {
  id: PropTypes.number.isRequired,
  tvdbId: PropTypes.number.isRequired,
  tvMazeId: PropTypes.number,
  imdbId: PropTypes.string,
  title: PropTypes.string.isRequired,
  runtime: PropTypes.number.isRequired,
  ratings: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  statistics: PropTypes.object.isRequired,
  qualityProfileId: PropTypes.number.isRequired,
  monitored: PropTypes.bool.isRequired,
  monitor: PropTypes.string,
  status: PropTypes.string.isRequired,
  network: PropTypes.string,
  overview: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  seasons: PropTypes.arrayOf(PropTypes.object).isRequired,
  alternateTitles: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.number).isRequired,
  isSaving: PropTypes.bool.isRequired,
  saveError: PropTypes.object,
  isRefreshing: PropTypes.bool.isRequired,
  isSearching: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isPopulated: PropTypes.bool.isRequired,
  issuesError: PropTypes.object,
  issueFilesError: PropTypes.object,
  hasIssues: PropTypes.bool.isRequired,
  hasMonitoredIssues: PropTypes.bool.isRequired,
  hasIssueFiles: PropTypes.bool.isRequired,
  previousComic: PropTypes.object.isRequired,
  nextComic: PropTypes.object.isRequired,
  onMonitorTogglePress: PropTypes.func.isRequired,
  onRefreshPress: PropTypes.func.isRequired,
  onSearchPress: PropTypes.func.isRequired
};

ComicDetails.defaultProps = {
  statistics: {},
  tags: [],
  isSaving: false
};

export default ComicDetails;
