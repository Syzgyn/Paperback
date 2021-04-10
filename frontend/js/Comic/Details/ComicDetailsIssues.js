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
import IssueRowConnector from './IssueRowConnector';
import SeasonInfo from './SeasonInfo';
import styles from './ComicDetailsIssues.css';

function getIssueCountKind(monitored, issueFileCount, issueCount) {
  if (issueFileCount === issueCount && issueCount > 0) {
    return kinds.SUCCESS;
  }

  if (!monitored) {
    return kinds.WARNING;
  }

  return kinds.DANGER;
}

class ComicDetailsIssues extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      lastToggledIssue: null
    };
  }

  //
  // Listeners

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
      items,
      columns,
      statistics,
      isSaving,
      isExpanded,
      isSearching,
      comicMonitored,
      isSmallScreen,
      onTableOptionChange,
      onSearchPress
    } = this.props;

    return (
        <div>
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
          </div>
      </div>
    );
  }
}

ComicDetailsIssues.propTypes = {
  comicId: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  statistics: PropTypes.object.isRequired,
  isSaving: PropTypes.bool,
  comicMonitored: PropTypes.bool.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  onTableOptionChange: PropTypes.func.isRequired,
  onMonitorIssuePress: PropTypes.func.isRequired,
};

ComicDetailsIssues.defaultProps = {
  statistics: {}
};

export default ComicDetailsIssues;
