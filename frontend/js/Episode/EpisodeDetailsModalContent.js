import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import episodeEntities from 'Episode/episodeEntities';
import Button from 'Components/Link/Button';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import MonitorToggleButton from 'Components/MonitorToggleButton';
import EpisodeSummaryConnector from './Summary/EpisodeSummaryConnector';
import EpisodeHistoryConnector from './History/EpisodeHistoryConnector';
import EpisodeSearchConnector from './Search/EpisodeSearchConnector';
import SeasonEpisodeNumber from './SeasonEpisodeNumber';
import styles from './EpisodeDetailsModalContent.css';

const tabs = [
  'details',
  'history',
  'search'
];

class EpisodeDetailsModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedTab: props.selectedTab
    };
  }

  //
  // Listeners

  onTabSelect = (index, lastIndex) => {
    const selectedTab = tabs[index];
    this.props.onTabChange(selectedTab === 'search');
    this.setState({ selectedTab });
  }

  //
  // Render

  render() {
    const {
      episodeId,
      episodeEntity,
      episodeFileId,
      comicId,
      comicTitle,
      titleSlug,
      comicMonitored,
      comicType,
      seasonNumber,
      episodeNumber,
      absoluteEpisodeNumber,
      episodeTitle,
      airDate,
      monitored,
      isSaving,
      showOpenComicButton,
      startInteractiveSearch,
      onMonitorEpisodePress,
      onModalClose
    } = this.props;

    const comicLink = `/comic/${titleSlug}`;

    return (
      <ModalContent
        onModalClose={onModalClose}
      >
        <ModalHeader>
          <MonitorToggleButton
            className={styles.toggleButton}
            id={episodeId}
            monitored={monitored}
            size={18}
            isDisabled={!comicMonitored}
            isSaving={isSaving}
            onPress={onMonitorEpisodePress}
          />

          <span className={styles.comicTitle}>
            {comicTitle}
          </span>

          <span className={styles.separator}>-</span>

          <SeasonEpisodeNumber
            seasonNumber={seasonNumber}
            episodeNumber={episodeNumber}
            absoluteEpisodeNumber={absoluteEpisodeNumber}
            airDate={airDate}
            comicType={comicType}
          />

          <span className={styles.separator}>-</span>

          {episodeTitle}
        </ModalHeader>

        <ModalBody>
          <Tabs
            className={styles.tabs}
            selectedIndex={tabs.indexOf(this.state.selectedTab)}
            onSelect={this.onTabSelect}
          >
            <TabList
              className={styles.tabList}
            >
              <Tab
                className={styles.tab}
                selectedClassName={styles.selectedTab}
              >
                Details
              </Tab>

              <Tab
                className={styles.tab}
                selectedClassName={styles.selectedTab}
              >
                History
              </Tab>

              <Tab
                className={styles.tab}
                selectedClassName={styles.selectedTab}
              >
                Search
              </Tab>
            </TabList>

            <TabPanel>
              <div className={styles.tabContent}>
                <EpisodeSummaryConnector
                  episodeId={episodeId}
                  episodeEntity={episodeEntity}
                  episodeFileId={episodeFileId}
                  comicId={comicId}
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className={styles.tabContent}>
                <EpisodeHistoryConnector
                  episodeId={episodeId}
                />
              </div>
            </TabPanel>

            <TabPanel>
              {/* Don't wrap in tabContent so we not have a top margin */}
              <EpisodeSearchConnector
                episodeId={episodeId}
                startInteractiveSearch={startInteractiveSearch}
                onModalClose={onModalClose}
              />
            </TabPanel>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          {
            showOpenComicButton &&
              <Button
                className={styles.openComicButton}
                to={comicLink}
                onPress={onModalClose}
              >
                Open Comic
              </Button>
          }

          <Button
            onPress={onModalClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  }
}

EpisodeDetailsModalContent.propTypes = {
  episodeId: PropTypes.number.isRequired,
  episodeEntity: PropTypes.string.isRequired,
  episodeFileId: PropTypes.number,
  comicId: PropTypes.number.isRequired,
  comicTitle: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  comicMonitored: PropTypes.bool.isRequired,
  comicType: PropTypes.string.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  episodeNumber: PropTypes.number.isRequired,
  absoluteEpisodeNumber: PropTypes.number,
  airDate: PropTypes.string.isRequired,
  episodeTitle: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool,
  showOpenComicButton: PropTypes.bool,
  selectedTab: PropTypes.string.isRequired,
  startInteractiveSearch: PropTypes.bool.isRequired,
  onMonitorEpisodePress: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

EpisodeDetailsModalContent.defaultProps = {
  selectedTab: 'details',
  episodeEntity: episodeEntities.EPISODES,
  startInteractiveSearch: false
};

export default EpisodeDetailsModalContent;
