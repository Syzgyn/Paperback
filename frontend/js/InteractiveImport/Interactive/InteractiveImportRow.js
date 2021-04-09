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
import IssueQuality from 'Issue/IssueQuality';
import IssueLanguage from 'Issue/IssueLanguage';
import SelectComicModal from 'InteractiveImport/Comic/SelectComicModal';
import SelectSeasonModal from 'InteractiveImport/Season/SelectSeasonModal';
import SelectIssueModal from 'InteractiveImport/Issue/SelectIssueModal';
import SelectQualityModal from 'InteractiveImport/Quality/SelectQualityModal';
import SelectLanguageModal from 'InteractiveImport/Language/SelectLanguageModal';
import InteractiveImportRowCellPlaceholder from './InteractiveImportRowCellPlaceholder';
import styles from './InteractiveImportRow.css';

class InteractiveImportRow extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isSelectComicModalOpen: false,
      isSelectSeasonModalOpen: false,
      isSelectIssueModalOpen: false,
      isSelectQualityModalOpen: false,
      isSelectLanguageModalOpen: false
    };
  }

  componentDidMount() {
    const {
      id,
      comic,
      seasonNumber,
      issues,
      quality,
      language
    } = this.props;

    if (
      comic &&
      seasonNumber != null &&
      issues.length &&
      quality &&
      language
    ) {
      this.props.onSelectedChange({ id, value: true });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      id,
      comic,
      seasonNumber,
      issues,
      quality,
      language,
      isSelected,
      onValidRowChange
    } = this.props;

    if (
      prevProps.comic === comic &&
      prevProps.seasonNumber === seasonNumber &&
      !hasDifferentItems(prevProps.issues, issues) &&
      prevProps.quality === quality &&
      prevProps.language === language &&
      prevProps.isSelected === isSelected
    ) {
      return;
    }

    const isValid = !!(
      comic &&
      seasonNumber != null &&
      issues.length &&
      quality &&
      language
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

  onSelectSeasonPress = () => {
    this.setState({ isSelectSeasonModalOpen: true });
  }

  onSelectIssuePress = () => {
    this.setState({ isSelectIssueModalOpen: true });
  }

  onSelectQualityPress = () => {
    this.setState({ isSelectQualityModalOpen: true });
  }

  onSelectLanguagePress = () => {
    this.setState({ isSelectLanguageModalOpen: true });
  }

  onSelectComicModalClose = (changed) => {
    this.setState({ isSelectComicModalOpen: false });
    this.selectRowAfterChange(changed);
  }

  onSelectSeasonModalClose = (changed) => {
    this.setState({ isSelectSeasonModalOpen: false });
    this.selectRowAfterChange(changed);
  }

  onSelectIssueModalClose = (changed) => {
    this.setState({ isSelectIssueModalOpen: false });
    this.selectRowAfterChange(changed);
  }

  onSelectQualityModalClose = (changed) => {
    this.setState({ isSelectQualityModalOpen: false });
    this.selectRowAfterChange(changed);
  }

  onSelectLanguageModalClose = (changed) => {
    this.setState({ isSelectLanguageModalOpen: false });
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
      seasonNumber,
      issues,
      quality,
      language,
      size,
      rejections,
      isReprocessing,
      isSelected,
      onSelectedChange
    } = this.props;

    const {
      isSelectComicModalOpen,
      isSelectSeasonModalOpen,
      isSelectIssueModalOpen,
      isSelectQualityModalOpen,
      isSelectLanguageModalOpen
    } = this.state;

    const comicTitle = comic ? comic.title : '';
    const isAnime = comic ? comic.comicType === 'anime' : false;

    const issueInfo = issues.map((issue) => {
      return (
        <div key={issue.id}>
          {issue.issueNumber}
          {isAnime ? ` (${issue.absoluteIssueNumber})` : ''}
          {` - ${issue.title}`}
        </div>
      );
    });

    const showComicPlaceholder = isSelected && !comic;
    const showSeasonNumberPlaceholder = isSelected && !!comic && isNaN(seasonNumber) && !isReprocessing;
    const showIssueNumbersPlaceholder = isSelected && Number.isInteger(seasonNumber) && !issues.length;
    const showQualityPlaceholder = isSelected && !quality;
    const showLanguagePlaceholder = isSelected && !language;

    return (
      <TableRow>
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
          title={comic ? 'Click to change season' : undefined}
          onPress={this.onSelectSeasonPress}
        >
          {
            showSeasonNumberPlaceholder ? <InteractiveImportRowCellPlaceholder /> : seasonNumber
          }

          {
            isReprocessing && seasonNumber == null ?
              <LoadingIndicator className={styles.reprocessing}
                size={20}

              /> : null
          }

        </TableRowCellButton>

        <TableRowCellButton
          isDisabled={!comic || isNaN(seasonNumber)}
          title={comic && !isNaN(seasonNumber) ? 'Click to change issue' : undefined}
          onPress={this.onSelectIssuePress}
        >
          {
            showIssueNumbersPlaceholder ? <InteractiveImportRowCellPlaceholder /> : issueInfo
          }
        </TableRowCellButton>

        <TableRowCellButton
          className={styles.quality}
          title="Click to change quality"
          onPress={this.onSelectQualityPress}
        >
          {
            showQualityPlaceholder &&
              <InteractiveImportRowCellPlaceholder />
          }

          {
            !showQualityPlaceholder && !!quality &&
              <IssueQuality
                className={styles.label}
                quality={quality}
              />
          }
        </TableRowCellButton>

        <TableRowCellButton
          className={styles.language}
          title="Click to change language"
          onPress={this.onSelectLanguagePress}
        >
          {
            showLanguagePlaceholder &&
              <InteractiveImportRowCellPlaceholder />
          }

          {
            !showLanguagePlaceholder && !!language &&
              <IssueLanguage
                className={styles.label}
                language={language}
              />
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

        <SelectSeasonModal
          isOpen={isSelectSeasonModalOpen}
          ids={[id]}
          comicId={comic && comic.id}
          onModalClose={this.onSelectSeasonModalClose}
        />

        <SelectIssueModal
          isOpen={isSelectIssueModalOpen}
          ids={[id]}
          comicId={comic && comic.id}
          isAnime={isAnime}
          seasonNumber={seasonNumber}
          relativePath={relativePath}
          onModalClose={this.onSelectIssueModalClose}
        />

        <SelectQualityModal
          isOpen={isSelectQualityModalOpen}
          ids={[id]}
          qualityId={quality ? quality.quality.id : 0}
          proper={quality ? quality.revision.version > 1 : false}
          real={quality ? quality.revision.real > 0 : false}
          onModalClose={this.onSelectQualityModalClose}
        />

        <SelectLanguageModal
          isOpen={isSelectLanguageModalOpen}
          ids={[id]}
          languageId={language ? language.id : 0}
          onModalClose={this.onSelectLanguageModalClose}
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
  seasonNumber: PropTypes.number,
  issues: PropTypes.arrayOf(PropTypes.object).isRequired,
  quality: PropTypes.object,
  language: PropTypes.object,
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
