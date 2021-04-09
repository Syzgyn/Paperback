import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import formatBytes from 'Utilities/Number/formatBytes';
import { ColorImpairedConsumer } from 'App/ColorImpairedContext';
import DescriptionList from 'Components/DescriptionList/DescriptionList';
import DescriptionListItem from 'Components/DescriptionList/DescriptionListItem';
import styles from './ComicIndexFooter.css';

class ComicIndexFooter extends PureComponent {

  //
  // Render

  render() {
    const { comic } = this.props;
    const count = comic.length;
    let issues = 0;
    let issueFiles = 0;
    let ended = 0;
    let continuing = 0;
    let monitored = 0;
    let totalFileSize = 0;

    comic.forEach((s) => {
      const { statistics = {} } = s;

      const {
        issueCount = 0,
        issueFileCount = 0,
        sizeOnDisk = 0
      } = statistics;

      issues += issueCount;
      issueFiles += issueFileCount;

      if (s.status === 'ended') {
        ended++;
      } else {
        continuing++;
      }

      if (s.monitored) {
        monitored++;
      }

      totalFileSize += sizeOnDisk;
    });

    return (
      <ColorImpairedConsumer>
        {(enableColorImpairedMode) => {
          return (
            <div className={styles.footer}>
              <div>
                <div className={styles.legendItem}>
                  <div
                    className={classNames(
                      styles.continuing,
                      enableColorImpairedMode && 'colorImpaired'
                    )}
                  />
                  <div>Continuing (All issues downloaded)</div>
                </div>

                <div className={styles.legendItem}>
                  <div
                    className={classNames(
                      styles.ended,
                      enableColorImpairedMode && 'colorImpaired'
                    )}
                  />
                  <div>Ended (All issues downloaded)</div>
                </div>

                <div className={styles.legendItem}>
                  <div
                    className={classNames(
                      styles.missingMonitored,
                      enableColorImpairedMode && 'colorImpaired'
                    )}
                  />
                  <div>Missing Issues (Comic monitored)</div>
                </div>

                <div className={styles.legendItem}>
                  <div
                    className={classNames(
                      styles.missingUnmonitored,
                      enableColorImpairedMode && 'colorImpaired'
                    )}
                  />
                  <div>Missing Issues (Comic not monitored)</div>
                </div>
              </div>

              <div className={styles.statistics}>
                <DescriptionList>
                  <DescriptionListItem
                    title="Comic"
                    data={count}
                  />

                  <DescriptionListItem
                    title="Ended"
                    data={ended}
                  />

                  <DescriptionListItem
                    title="Continuing"
                    data={continuing}
                  />
                </DescriptionList>

                <DescriptionList>
                  <DescriptionListItem
                    title="Monitored"
                    data={monitored}
                  />

                  <DescriptionListItem
                    title="Unmonitored"
                    data={count - monitored}
                  />
                </DescriptionList>

                <DescriptionList>
                  <DescriptionListItem
                    title="Issues"
                    data={issues}
                  />

                  <DescriptionListItem
                    title="Files"
                    data={issueFiles}
                  />
                </DescriptionList>

                <DescriptionList>
                  <DescriptionListItem
                    title="Total File Size"
                    data={formatBytes(totalFileSize)}
                  />
                </DescriptionList>
              </div>
            </div>
          );
        }}
      </ColorImpairedConsumer>
    );
  }
}

ComicIndexFooter.propTypes = {
  comic: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ComicIndexFooter;
