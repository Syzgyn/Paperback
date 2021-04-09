import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import padNumber from 'Utilities/Number/padNumber';
import filterAlternateTitles from 'Utilities/Comic/filterAlternateTitles';
import { icons, kinds, tooltipPositions } from 'Helpers/Props';
import Icon from 'Components/Icon';
import Popover from 'Components/Tooltip/Popover';
import SceneInfo from './SceneInfo';
import styles from './IssueNumber.css';

function getWarningMessage(unverifiedSceneNumbering, comicType, absoluteIssueNumber) {
  const messages = [];

  if (unverifiedSceneNumbering) {
    messages.push('Scene number hasn\'t been verified yet');
  }

  if (comicType === 'anime' && !absoluteIssueNumber) {
    messages.push('Issue does not have an absolute issue number');
  }

  return messages.join('\n');
}

function IssueNumber(props) {
  const {
    seasonNumber,
    issueNumber,
    absoluteIssueNumber,
    sceneSeasonNumber,
    sceneIssueNumber,
    sceneAbsoluteIssueNumber,
    useSceneNumbering,
    unverifiedSceneNumbering,
    alternateTitles: comicAlternateTitles,
    comicType,
    showSeasonNumber
  } = props;

  const alternateTitles = filterAlternateTitles(comicAlternateTitles, null, useSceneNumbering, seasonNumber, sceneSeasonNumber);

  const hasSceneInformation = sceneSeasonNumber !== undefined ||
    sceneIssueNumber !== undefined ||
    (comicType === 'anime' && sceneAbsoluteIssueNumber !== undefined) ||
    !!alternateTitles.length;

  const warningMessage = getWarningMessage(unverifiedSceneNumbering, comicType, absoluteIssueNumber);

  return (
    <span>
      {
        hasSceneInformation ?
          <Popover
            anchor={
              <span>
                {
                  showSeasonNumber && seasonNumber != null &&
                    <Fragment>
                      {seasonNumber}x
                    </Fragment>
                }

                {showSeasonNumber ? padNumber(issueNumber, 2) : issueNumber}

                {
                  comicType === 'anime' && !!absoluteIssueNumber &&
                    <span className={styles.absoluteIssueNumber}>
                      ({absoluteIssueNumber})
                    </span>
                }
              </span>
            }
            title="Scene Information"
            body={
              <SceneInfo
                seasonNumber={seasonNumber}
                issueNumber={issueNumber}
                sceneSeasonNumber={sceneSeasonNumber}
                sceneIssueNumber={sceneIssueNumber}
                sceneAbsoluteIssueNumber={sceneAbsoluteIssueNumber}
                alternateTitles={alternateTitles}
                comicType={comicType}
              />
            }
            position={tooltipPositions.RIGHT}
          /> :
          <span>
            {
              showSeasonNumber && seasonNumber != null &&
                <Fragment>
                  {seasonNumber}x
                </Fragment>
            }

            {showSeasonNumber ? padNumber(issueNumber, 2) : issueNumber}

            {
              comicType === 'anime' && !!absoluteIssueNumber &&
                <span className={styles.absoluteIssueNumber}>
                  ({absoluteIssueNumber})
                </span>
            }
          </span>
      }

      {
        warningMessage ?
          <Icon
            className={styles.warning}
            name={icons.WARNING}
            kind={kinds.WARNING}
            title={warningMessage}
          /> :
          null
      }

    </span>
  );
}

IssueNumber.propTypes = {
  seasonNumber: PropTypes.number.isRequired,
  issueNumber: PropTypes.number.isRequired,
  absoluteIssueNumber: PropTypes.number,
  sceneSeasonNumber: PropTypes.number,
  sceneIssueNumber: PropTypes.number,
  sceneAbsoluteIssueNumber: PropTypes.number,
  useSceneNumbering: PropTypes.bool.isRequired,
  unverifiedSceneNumbering: PropTypes.bool.isRequired,
  alternateTitles: PropTypes.arrayOf(PropTypes.object).isRequired,
  comicType: PropTypes.string,
  showSeasonNumber: PropTypes.bool.isRequired
};

IssueNumber.defaultProps = {
  useSceneNumbering: false,
  unverifiedSceneNumbering: false,
  alternateTitles: [],
  showSeasonNumber: false
};

export default IssueNumber;
