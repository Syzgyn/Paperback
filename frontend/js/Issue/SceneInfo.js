import PropTypes from 'prop-types';
import React from 'react';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import padNumber from 'Utilities/Number/padNumber';
import styles from './SceneInfo.css';

function SceneInfo(props) {
  const {
    seasonNumber,
    issueNumber,
    sceneSeasonNumber,
    sceneIssueNumber,
    sceneAbsoluteIssueNumber,
    alternateTitles,
    comicType
  } = props;

  return (
    <DescriptionList className={styles.descriptionList}>
      {
        sceneSeasonNumber !== undefined &&
          <DescriptionListItem
            titleClassName={styles.title}
            descriptionClassName={styles.description}
            title="Season"
            data={sceneSeasonNumber}
          />
      }

      {
        sceneIssueNumber !== undefined &&
          <DescriptionListItem
            titleClassName={styles.title}
            descriptionClassName={styles.description}
            title="Issue"
            data={sceneIssueNumber}
          />
      }

      {
        comicType === 'anime' && sceneAbsoluteIssueNumber !== undefined &&
          <DescriptionListItem
            titleClassName={styles.title}
            descriptionClassName={styles.description}
            title="Absolute"
            data={sceneAbsoluteIssueNumber}
          />
      }

      {
        !!alternateTitles.length &&
          <DescriptionListItem
            titleClassName={styles.title}
            descriptionClassName={styles.description}
            title={alternateTitles.length === 1 ? 'Title' : 'Titles'}
            data={
              <div>
                {
                  alternateTitles.map((alternateTitle) => {
                    let suffix = '';

                    const altSceneSeasonNumber = sceneSeasonNumber === undefined ? seasonNumber : sceneSeasonNumber;
                    const altSceneIssueNumber = sceneIssueNumber === undefined ? issueNumber : sceneIssueNumber;

                    const mappingSeasonNumber = alternateTitle.sceneOrigin === 'tvdb' ? seasonNumber : altSceneSeasonNumber;
                    const altSeasonNumber = (alternateTitle.sceneSeasonNumber !== -1 && alternateTitle.sceneSeasonNumber !== undefined) ? alternateTitle.sceneSeasonNumber : mappingSeasonNumber;
                    const altIssueNumber = alternateTitle.sceneOrigin === 'tvdb' ? issueNumber : altSceneIssueNumber;

                    if (altIssueNumber !== altSceneIssueNumber) {
                      suffix = `S${padNumber(altSeasonNumber, 2)}E${padNumber(altIssueNumber, 2)}`;
                    } else if (altSeasonNumber !== altSceneSeasonNumber) {
                      suffix = `S${padNumber(altSeasonNumber, 2)}`;
                    }

                    return (
                      <div
                        key={alternateTitle.title}
                      >
                        {alternateTitle.title}
                        {
                          suffix &&
                          <span> ({suffix})</span>
                        }
                        {
                          alternateTitle.comment &&
                          <span className={styles.comment}> {alternateTitle.comment}</span>
                        }
                      </div>
                    );
                  })
                }
              </div>
            }
          />
      }
    </DescriptionList>
  );
}

SceneInfo.propTypes = {
  seasonNumber: PropTypes.number,
  issueNumber: PropTypes.number,
  sceneSeasonNumber: PropTypes.number,
  sceneIssueNumber: PropTypes.number,
  sceneAbsoluteIssueNumber: PropTypes.number,
  alternateTitles: PropTypes.arrayOf(PropTypes.object).isRequired,
  comicType: PropTypes.string
};

export default SceneInfo;
