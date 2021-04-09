/* eslint max-params: 0 */
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createIssueFileSelector from 'Store/Selectors/createIssueFileSelector';
import IssueRow from './IssueRow';

function createMapStateToProps() {
  return createSelector(
    createComicSelector(),
    createIssueFileSelector(),
    (comic = {}, issueFile) => {
      return {
        useSceneNumbering: comic.useSceneNumbering,
        comicMonitored: comic.monitored,
        comicType: comic.comicType,
        issueFilePath: issueFile ? issueFile.path : null,
        issueFileRelativePath: issueFile ? issueFile.relativePath : null,
        issueFileSize: issueFile ? issueFile.size : null,
        alternateTitles: comic.alternateTitles
      };
    }
  );
}
export default connect(createMapStateToProps)(IssueRow);
