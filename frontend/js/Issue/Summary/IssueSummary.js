import PropTypes from 'prop-types';
import React, { Component } from 'react';
import formatBytes from 'Utilities/Number/formatBytes';
import { icons, kinds, sizes, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Label from 'Components/Label';
import IconButton from 'Components/Link/IconButton';
import ConfirmModal from 'Components/Modal/ConfirmModal';
import Popover from 'Components/Tooltip/Popover';
import QualityProfileNameConnector from 'Settings/Profiles/Quality/QualityProfileNameConnector';
import IssueQuality from 'Issue/IssueQuality';
import IssueReleaseConnector from './IssueReleaseConnector';
import MediaInfo from './MediaInfo';
import styles from './IssueSummary.css';
import ReactHtmlParser from 'react-html-parser';

class IssueSummary extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isRemoveIssueFileModalOpen: false
    };
  }

  //
  // Listeners

  onRemoveIssueFilePress = () => {
    this.setState({ isRemoveIssueFileModalOpen: true });
  }

  onConfirmRemoveIssueFile = () => {
    this.props.onDeleteIssueFile();
    this.setState({ isRemoveIssueFileModalOpen: false });
  }

  onRemoveIssueFileModalClose = () => {
    this.setState({ isRemoveIssueFileModalOpen: false });
  }

  //
  // Render

  render() {
    const {
      qualityProfileId,
      publisher,
      overview,
      storeDate,
      coverDate,
      mediaInfo,
      path,
      size,
      quality,
      qualityCutoffNotMet
    } = this.props;

    const hasOverview = !!overview;

    return (
      <div>
        <div>
          <IssueReleaseConnector
            storeDate={storeDate}
            coverDate={coverDate}
            publisher={publisher}
          />
        </div>

        <div className={styles.overview}>
          {
            hasOverview ?
              ReactHtmlParser(overview) :
              'No issue overview.'
          }
        </div>

        {
          path &&
            <div className={styles.files}>
              <div className={styles.filesHeader}>
                <div className={styles.path}>
                  Path
                </div>

                <div className={styles.size}>
                  Size
                </div>

                <div className={styles.quality}>
                  Quality
                </div>

                <div className={styles.actions} />
              </div>

              <div className={styles.fileRow}>
                <div
                  className={styles.path}
                  title={path}
                >
                  {path}
                </div>

                <div className={styles.size}>
                  {formatBytes(size)}
                </div>

                <div className={styles.quality}>
                  <IssueQuality
                    quality={quality}
                    isCutoffNotMet={qualityCutoffNotMet}
                  />
                </div>

                <div className={styles.actions}>
                  <Popover
                    anchor={
                      <Icon
                        name={icons.MEDIA_INFO}
                      />
                    }
                    title="Media Info"
                    body={<MediaInfo {...mediaInfo} />}
                    position={tooltipPositions.LEFT}
                  />

                  <IconButton
                    title="Delete issue from disk"
                    name={icons.REMOVE}
                    onPress={this.onRemoveIssueFilePress}
                  />
                </div>
              </div>
            </div>
        }

        <ConfirmModal
          isOpen={this.state.isRemoveIssueFileModalOpen}
          kind={kinds.DANGER}
          title="Delete Issue File"
          message={`Are you sure you want to delete '${path}'?`}
          confirmLabel="Delete"
          onConfirm={this.onConfirmRemoveIssueFile}
          onCancel={this.onRemoveIssueFileModalClose}
        />
      </div>
    );
  }
}

IssueSummary.propTypes = {
  issueFileId: PropTypes.number.isRequired,
  publisher: PropTypes.string,
  overview: PropTypes.string,
  storeDate: PropTypes.string,
  coverDate: PropTypes.string,
  path: PropTypes.string,
  size: PropTypes.number,
  quality: PropTypes.object,
  qualityCutoffNotMet: PropTypes.bool,
  onDeleteIssueFile: PropTypes.func.isRequired
};

export default IssueSummary;
