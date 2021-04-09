import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import isAfter from 'Utilities/Date/isAfter';
import isBefore from 'Utilities/Date/isBefore';
import formatBytes from 'Utilities/Number/formatBytes';
import getToggledRange from 'Utilities/Table/getToggledRange';
import { align, icons, kinds, sizes, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import IconButton from 'Components/Link/IconButton';
import Label from 'Components/Label';
import Link from 'Components/Link/Link';
import MonitorToggleButton from 'Components/MonitorToggleButton';
import SpinnerIcon from 'Components/SpinnerIcon';
import SpinnerIconButton from 'Components/Link/SpinnerIconButton';
import Menu from 'Components/Menu/Menu';
import MenuButton from 'Components/Menu/MenuButton';
import MenuContent from 'Components/Menu/MenuContent';
import MenuItem from 'Components/Menu/MenuItem';
import Table from 'Components/Table/Table';
import TableBody from 'Components/Table/TableBody';
import Popover from 'Components/Tooltip/Popover';
import IssueFileEditorModal from 'IssueFile/Editor/IssueFileEditorModal';
import OrganizePreviewModalConnector from 'Organize/OrganizePreviewModalConnector';
import ComicHistoryModal from 'Comic/History/ComicHistoryModal';
import SeasonInteractiveSearchModalConnector from 'Comic/Search/SeasonInteractiveSearchModalConnector';
import IssueRowConnector from './IssueRowConnector';
import SeasonInfo from './SeasonInfo';
import styles from './ComicDetailsSeason.css';

function getSeasonStatistics(issues) {
  let issueCount = 0;
  let issueFileCount = 0;
  let totalIssueCount = 0;
  let monitoredIssueCount = 0;
  let hasMonitoredIssues = false;
  const sizeOnDisk = 0;

  issues.forEach((issue) => {
    if (issue.issueFileId || (issue.monitored && isBefore(issue.airDateUtc))) {
      issueCount++;
    }

    if (issue.issueFileId) {
      issueFileCount++;
    }

    if (issue.monitored) {
      monitoredIssueCount++;
      hasMonitoredIssues = true;
    }

    totalIssueCount++;
  });

  return {
    issueCount,
    issueFileCount,
    totalIssueCount,
    monitoredIssueCount,
    hasMonitoredIssues,
    sizeOnDisk
  };
}

function getIssueCountKind(monitored, issueFileCount, issueCount) {
  if (issueFileCount === issueCount && issueCount > 0) {
    return kinds.SUCCESS;
  }

  if (!monitored) {
    return kinds.WARNING;
  }

  return kinds.DANGER;
}

class ComicDetailsSeason extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isOrganizeModalOpen: false,
      isManageIssuesOpen: false,
      isHistoryModalOpen: false,
      isInteractiveSearchModalOpen: false,
      lastToggledIssue: null
    };
  }

  componentDidMount() {
    this._expandByDefault();
  }

  componentDidUpdate(prevProps) {
    const {
      comicId,
      items
    } = this.props;

    if (prevProps.comicId !== comicId) {
      this._expandByDefault();
      return;
    }

    if (
      getSeasonStatistics(prevProps.items).issueFileCount > 0 &&
      getSeasonStatistics(items).issueFileCount === 0
    ) {
      this.setState({
        isOrganizeModalOpen: false,
        isManageIssuesOpen: false
      });
    }
  }

  //
  // Control

  _expandByDefault() {
    const {
      seasonNumber,
      onExpandPress,
      items
    } = this.props;

    const expand = _.some(items, (item) => {
      return isAfter(item.airDateUtc) ||
             isAfter(item.airDateUtc, { days: -30 });
    });

    onExpandPress(seasonNumber, expand && seasonNumber > 0);
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

  onHistoryPress = () => {
    this.setState({ isHistoryModalOpen: true });
  }

  onHistoryModalClose = () => {
    this.setState({ isHistoryModalOpen: false });
  }

  onInteractiveSearchPress = () => {
    this.setState({ isInteractiveSearchModalOpen: true });
  }

  onInteractiveSearchModalClose = () => {
    this.setState({ isInteractiveSearchModalOpen: false });
  }

  onExpandPress = () => {
    const {
      seasonNumber,
      isExpanded
    } = this.props;

    this.props.onExpandPress(seasonNumber, !isExpanded);
  }

  onMonitorIssuePress = (issueId, monitored, { shiftKey }) => {
    const lastToggled = this.state.lastToggledIssue;
    const issueIds = [issueId];

    if (shiftKey && lastToggled) {
      const { lower, upper } = getToggledRange(this.props.items, issueId, lastToggled);
      const items = this.props.items;

      for (let i = lower; i < upper; i++) {
        issueIds.push(items[i].id);
      }
    }

    this.setState({ lastToggledIssue: issueId });

    this.props.onMonitorIssuePress(_.uniq(issueIds), monitored);
  }

  //
  // Render

  render() {
    const {
      comicId,
      monitored,
      seasonNumber,
      items,
      columns,
      statistics,
      isSaving,
      isExpanded,
      isSearching,
      comicMonitored,
      isSmallScreen,
      onTableOptionChange,
      onMonitorSeasonPress,
      onSearchPress
    } = this.props;

    const {
      issueCount,
      issueFileCount,
      totalIssueCount,
      monitoredIssueCount,
      hasMonitoredIssues
    } = getSeasonStatistics(items);

    const {
      isOrganizeModalOpen,
      isManageIssuesOpen,
      isHistoryModalOpen,
      isInteractiveSearchModalOpen
    } = this.state;

    return (
      <div
        className={styles.season}
      >
        <div className={styles.header}>
          <div className={styles.left}>
            <MonitorToggleButton
              monitored={monitored}
              isDisabled={!comicMonitored}
              isSaving={isSaving}
              size={24}
              onPress={onMonitorSeasonPress}
            />

            {
              seasonNumber === 0 ?
                <span className={styles.seasonNumber}>
                  Specials
                </span> :
                <span className={styles.seasonNumber}>
                  Season {seasonNumber}
                </span>
            }

            <Popover
              className={styles.issueCountTooltip}
              anchor={
                <Label
                  kind={getIssueCountKind(monitored, issueFileCount, issueCount)}
                  size={sizes.LARGE}
                >
                  <span>{issueFileCount} / {issueCount}</span>
                </Label>
              }
              title="Season Information"
              body={
                <div>
                  <SeasonInfo
                    totalIssueCount={totalIssueCount}
                    monitoredIssueCount={monitoredIssueCount}
                    issueFileCount={issueFileCount}
                    sizeOnDisk={statistics.sizeOnDisk}
                  />
                </div>
              }
              position={tooltipPositions.BOTTOM}
            />

            {
              statistics.sizeOnDisk ?
                <div className={styles.sizeOnDisk}>
                  {formatBytes(statistics.sizeOnDisk)}
                </div> :
                null
            }
          </div>

          <Link
            className={styles.expandButton}
            onPress={this.onExpandPress}
          >
            <Icon
              className={styles.expandButtonIcon}
              name={isExpanded ? icons.COLLAPSE : icons.EXPAND}
              title={isExpanded ? 'Hide issues' : 'Show issues'}
              size={24}
            />
            {
              !isSmallScreen &&
                <span>&nbsp;</span>
            }
          </Link>

          {
            isSmallScreen ?
              <Menu
                className={styles.actionsMenu}
                alignMenu={align.RIGHT}
                enforceMaxHeight={false}
              >
                <MenuButton>
                  <Icon
                    name={icons.ACTIONS}
                    size={22}
                  />
                </MenuButton>

                <MenuContent className={styles.actionsMenuContent}>
                  <MenuItem
                    isDisabled={isSearching || !hasMonitoredIssues || !comicMonitored}
                    onPress={onSearchPress}
                  >
                    <SpinnerIcon
                      className={styles.actionMenuIcon}
                      name={icons.SEARCH}
                      isSpinning={isSearching}
                    />

                    Search
                  </MenuItem>

                  <MenuItem
                    onPress={this.onInteractiveSearchPress}
                    isDisabled={!totalIssueCount}
                  >
                    <Icon
                      className={styles.actionMenuIcon}
                      name={icons.INTERACTIVE}
                    />

                    Interactive Search
                  </MenuItem>

                  <MenuItem
                    onPress={this.onOrganizePress}
                    isDisabled={!issueFileCount}
                  >
                    <Icon
                      className={styles.actionMenuIcon}
                      name={icons.ORGANIZE}
                    />

                    Preview Rename
                  </MenuItem>

                  <MenuItem
                    onPress={this.onManageIssuesPress}
                    isDisabled={!issueFileCount}
                  >
                    <Icon
                      className={styles.actionMenuIcon}
                      name={icons.ISSUE_FILE}
                    />

                    Manage Issues
                  </MenuItem>

                  <MenuItem
                    onPress={this.onHistoryPress}
                    isDisabled={!totalIssueCount}
                  >
                    <Icon
                      className={styles.actionMenuIcon}
                      name={icons.HISTORY}
                    />

                    History
                  </MenuItem>
                </MenuContent>
              </Menu> :

              <div className={styles.actions}>
                <SpinnerIconButton
                  className={styles.actionButton}
                  name={icons.SEARCH}
                  title={hasMonitoredIssues && comicMonitored ? 'Search for monitored issues in this season' : 'No monitored issues in this season'}
                  size={24}
                  isSpinning={isSearching}
                  isDisabled={isSearching || !hasMonitoredIssues || !comicMonitored}
                  onPress={onSearchPress}
                />

                <IconButton
                  className={styles.actionButton}
                  name={icons.INTERACTIVE}
                  title="Interactive search for all issues in this season"
                  size={24}
                  isDisabled={!totalIssueCount}
                  onPress={this.onInteractiveSearchPress}
                />

                <IconButton
                  className={styles.actionButton}
                  name={icons.ORGANIZE}
                  title="Preview rename for this season"
                  size={24}
                  isDisabled={!issueFileCount}
                  onPress={this.onOrganizePress}
                />

                <IconButton
                  className={styles.actionButton}
                  name={icons.ISSUE_FILE}
                  title="Manage issue files in this season"
                  size={24}
                  isDisabled={!issueFileCount}
                  onPress={this.onManageIssuesPress}
                />

                <IconButton
                  className={styles.actionButton}
                  name={icons.HISTORY}
                  title="View history for this season"
                  size={24}
                  isDisabled={!totalIssueCount}
                  onPress={this.onHistoryPress}
                />
              </div>
          }

        </div>

        <div>
          {
            isExpanded &&
              <div className={styles.issues}>
                {
                  items.length ?
                    <Table
                      columns={columns}
                      onTableOptionChange={onTableOptionChange}
                    >
                      <TableBody>
                        {
                          items.map((item) => {
                            return (
                              <IssueRowConnector
                                key={item.id}
                                columns={columns}
                                {...item}
                                onMonitorIssuePress={this.onMonitorIssuePress}
                              />
                            );
                          })
                        }
                      </TableBody>
                    </Table> :

                    <div className={styles.noIssues}>
                      No issues in this season
                    </div>
                }
                <div className={styles.collapseButtonContainer}>
                  <IconButton
                    iconClassName={styles.collapseButtonIcon}
                    name={icons.COLLAPSE}
                    size={20}
                    title="Hide issues"
                    onPress={this.onExpandPress}
                  />
                </div>
              </div>
          }
        </div>

        <OrganizePreviewModalConnector
          isOpen={isOrganizeModalOpen}
          comicId={comicId}
          seasonNumber={seasonNumber}
          onModalClose={this.onOrganizeModalClose}
        />

        <IssueFileEditorModal
          isOpen={isManageIssuesOpen}
          comicId={comicId}
          seasonNumber={seasonNumber}
          onModalClose={this.onManageIssuesModalClose}
        />

        <ComicHistoryModal
          isOpen={isHistoryModalOpen}
          comicId={comicId}
          seasonNumber={seasonNumber}
          onModalClose={this.onHistoryModalClose}
        />

        <SeasonInteractiveSearchModalConnector
          isOpen={isInteractiveSearchModalOpen}
          comicId={comicId}
          seasonNumber={seasonNumber}
          onModalClose={this.onInteractiveSearchModalClose}
        />
      </div>
    );
  }
}

ComicDetailsSeason.propTypes = {
  comicId: PropTypes.number.isRequired,
  monitored: PropTypes.bool.isRequired,
  seasonNumber: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  statistics: PropTypes.object.isRequired,
  isSaving: PropTypes.bool,
  isExpanded: PropTypes.bool,
  isSearching: PropTypes.bool.isRequired,
  comicMonitored: PropTypes.bool.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  onTableOptionChange: PropTypes.func.isRequired,
  onMonitorSeasonPress: PropTypes.func.isRequired,
  onExpandPress: PropTypes.func.isRequired,
  onMonitorIssuePress: PropTypes.func.isRequired,
  onSearchPress: PropTypes.func.isRequired
};

ComicDetailsSeason.defaultProps = {
  statistics: {}
};

export default ComicDetailsSeason;
