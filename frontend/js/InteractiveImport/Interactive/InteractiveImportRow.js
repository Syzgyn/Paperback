import PropTypes from 'prop-types';
import React, { Component } from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import hasDifferentItems from 'Utilities/Object/hasDifferentItems';
import { icons, kinds, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import LoadingIndicator from 'Components/Loading/LoadingIndicator';
import TableRow from 'Components/Table/TableRow';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableRowCellButton from 'Components/Table/Cells/TableRowCellButton';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import Popover from 'Components/Tooltip/Popover';
import SelectComicModal from 'InteractiveImport/Comic/SelectComicModal';
import SelectIssueModal from 'InteractiveImport/Issue/SelectIssueModal';
import InteractiveImportRowCellPlaceholder from './InteractiveImportRowCellPlaceholder';
import styles from './InteractiveImportRow.css';

class InteractiveImportRow extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isSelectComicModalOpen: false,
      isSelectIssueModalOpen: false,
    };
  }

  componentDidMount() {
    const {
      id,
      comic,
      issues,
    } = this.props;

    if (
      comic &&
      issues.length
    ) {
      this.props.onSelectedChange({ id, value: true });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      id,
      comic,
      issues,
      isSelected,
      onValidRowChange
    } = this.props;

    if (
      prevProps.comic === comic &&
      !hasDifferentItems(prevProps.issues, issues) &&
      prevProps.isSelected === isSelected
    ) {
      return;
    }

    const isValid = !!(
      comic &&
      issues.length
    );

    if (isSelected && !isValid) {
      onValidRowChange(id, false);
    } else {
      onValidRowChange(id, true);
    }
  }

  //
  // Control

  selectRowAfterChange = (value) => {
    const {
      id,
      isSelected
    } = this.props;

    if (!isSelected && value === true) {
      this.props.onSelectedChange({ id, value });
    }
  }

  //
  // Listeners

  onSelectComicPress = () => {
    this.setState({ isSelectComicModalOpen: true });
  }

  onSelectIssuePress = () => {
    this.setState({ isSelectIssueModalOpen: true });
  }

  onSelectComicModalClose = (changed) => {
    this.setState({ isSelectComicModalOpen: false });
    this.selectRowAfterChange(changed);
  }

  onSelectIssueModalClose = (changed) => {
    this.setState({ isSelectIssueModalOpen: false });
    this.selectRowAfterChange(changed);
  }

  //
  // Render

  render() {
    const {
      id,
      allowComicChange,
      relativePath,
      comic,
      issues,
      size,
      rejections,
      isReprocessing,
      isSelected,
      onSelectedChange
    } = this.props;

    const {
      isSelectComicModalOpen,
      isSelectIssueModalOpen,
    } = this.state;

    const comicTitle = comic ? comic.title : '';
    const isAnime = comic ? comic.comicType === 'anime' : false;

    const issueInfo = issues.map((issue) => {
      return (
        <div key={issue.cvid}>
          {`${issue.issue_num} - ${issue.title}`}
        </div>
      );
    });

    const showComicPlaceholder = isSelected && !comic;
    const showIssueNumbersPlaceholder = isSelected && !issues.length;

    return (
      <TableRow key={id}>
        <TableSelectCell
          id={id}
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
        />

        <TableRowCell
          className={styles.relativePath}
          title={relativePath}
        >
          {relativePath}
        </TableRowCell>

        <TableRowCellButton
          isDisabled={!allowComicChange}
          title={allowComicChange ? 'Click to change comic' : undefined}
          onPress={this.onSelectComicPress}
        >
          {
            showComicPlaceholder ? <InteractiveImportRowCellPlaceholder /> : comicTitle
          }
        </TableRowCellButton>

        <TableRowCellButton
          isDisabled={!comic}
          title={comic ? 'Click to change issue' : undefined}
          onPress={this.onSelectIssuePress}
        >
          {
            showIssueNumbersPlaceholder ? <InteractiveImportRowCellPlaceholder /> : issueInfo
          }
        </TableRowCellButton>

        <TableRowCell>
          {formatBytes(size)}
        </TableRowCell>

        <TableRowCell>
          {
            rejections && rejections.length ?
              <Popover
                anchor={
                  <Icon
                    name={icons.DANGER}
                    kind={kinds.DANGER}
                  />
                }
                title="Release Rejected"
                body={
                  <ul>
                    {
                      rejections.map((rejection, index) => {
                        return (
                          <li key={index}>
                            {rejection.reason}
                          </li>
                        );
                      })
                    }
                  </ul>
                }
                position={tooltipPositions.LEFT}
              /> :
              null
          }
        </TableRowCell>

        <SelectComicModal
          isOpen={isSelectComicModalOpen}
          ids={[id]}
          onModalClose={this.onSelectComicModalClose}
        />

        <SelectIssueModal
          isOpen={isSelectIssueModalOpen}
          ids={[id]}
          comicId={comic && comic.id}
          isAnime={isAnime}
          relativePath={relativePath}
          onModalClose={this.onSelectIssueModalClose}
        />
      </TableRow>
    );
  }

}

InteractiveImportRow.propTypes = {
  id: PropTypes.number.isRequired,
  allowComicChange: PropTypes.bool.isRequired,
  relativePath: PropTypes.string.isRequired,
  comic: PropTypes.object,
  issues: PropTypes.arrayOf(PropTypes.object).isRequired,
  size: PropTypes.number.isRequired,
  rejections: PropTypes.arrayOf(PropTypes.object).isRequired,
  isReprocessing: PropTypes.bool,
  isSelected: PropTypes.bool,
  onSelectedChange: PropTypes.func.isRequired,
  onValidRowChange: PropTypes.func.isRequired
};

InteractiveImportRow.defaultProps = {
  issues: []
};

export default InteractiveImportRow;
