import _ from 'lodash';
import { createSelector } from 'reselect';
import issueEntities from 'Issue/issueEntities';

function createIssueSelector() {
  return createSelector(
    (state, { issueId }) => issueId,
    (state, { issueEntity = issueEntities.ISSUES }) => _.get(state, issueEntity, { items: [] }),
    (issueId, issues) => {
      return _.find(issues.items, { id: issueId });
    }
  );
}

export default createIssueSelector;
