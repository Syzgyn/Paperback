import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createIssueFileSelector from 'Store/Selectors/createIssueFileSelector';
import IssueLanguage from 'Issue/IssueLanguage';

function createMapStateToProps() {
  return createSelector(
    createIssueFileSelector(),
    (issueFile) => {
      return {
        language: issueFile ? issueFile.language : undefined
      };
    }
  );
}

export default connect(createMapStateToProps)(IssueLanguage);
