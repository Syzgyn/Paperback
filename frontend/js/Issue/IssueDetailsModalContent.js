import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import issueEntities from 'Issue/issueEntities';
import Button from 'Components/Link/Button';
import ModalContent from 'Components/Modal/ModalContent';
import ModalHeader from 'Components/Modal/ModalHeader';
import ModalBody from 'Components/Modal/ModalBody';
import ModalFooter from 'Components/Modal/ModalFooter';
import MonitorToggleButton from 'Components/MonitorToggleButton';
import IssueSummaryConnector from './Summary/IssueSummaryConnector';
import IssueHistoryConnector from './History/IssueHistoryConnector';
import IssueSearchConnector from './Search/IssueSearchConnector';
import SeasonIssueNumber from './SeasonIssueNumber';
import styles from './IssueDetailsModalContent.css';

const tabs = [
  'details',
  'history',
  'search'
];

class IssueDetailsModalContent extends Component {

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
      issueId,
      issueEntity,
      issueFileId,
      comicId,
      comicTitle,
      titleSlug,
      comicMonitored,
      comicType,
      seasonNumber,
      issueNumber,
      absoluteIssueNumber,
      issueTitle,
      monitored,
      isSaving,
      showOpenComicButton,
      startInteractiveSearch,
      onMonitorIssuePress,
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
            id={issueId}
            monitored={monitored}
            size={18}
            isDisabled={!comicMonitored}
            isSaving={isSaving}
            onPress={onMonitorIssuePress}
          />

          <span className={styles.comicTitle}>
            {comicTitle}
          </span>

          <span className={styles.separator}>-</span>

          {issueTitle}
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
                <IssueSummaryConnector
                  issueId={issueId}
                  issueEntity={issueEntity}
                  issueFileId={issueFileId}
                  comicId={comicId}
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className={styles.tabContent}>
                <IssueHistoryConnector
                  issueId={issueId}
                />
              </div>
            </TabPanel>

            <TabPanel>
              {/* Don't wrap in tabContent so we not have a top margin */}
              <IssueSearchConnector
                issueId={issueId}
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

IssueDetailsModalContent.propTypes = {
  issueId: PropTypes.number.isRequired,
  issueEntity: PropTypes.string.isRequired,
  issueFileId: PropTypes.number,
  comicId: PropTypes.number.isRequired,
  comicTitle: PropTypes.string.isRequired,
  titleSlug: PropTypes.string.isRequired,
  comicMonitored: PropTypes.bool.isRequired,
  comicType: PropTypes.string.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  issueNumber: PropTypes.number.isRequired,
  absoluteIssueNumber: PropTypes.number,
  issueTitle: PropTypes.string.isRequired,
  monitored: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool,
  showOpenComicButton: PropTypes.bool,
  selectedTab: PropTypes.string.isRequired,
  startInteractiveSearch: PropTypes.bool.isRequired,
  onMonitorIssuePress: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

IssueDetailsModalContent.defaultProps = {
  selectedTab: 'details',
  issueEntity: issueEntities.ISSUES,
  startInteractiveSearch: false
};

export default IssueDetailsModalContent;
