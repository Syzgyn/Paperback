import _ from 'lodash';
import { createSelector } from 'reselect';
import issueEntities from 'Issue/episodeEntities';

function createIssueSelector() {
  return createSelector(
    (state, { issueId }) => episodeId,
    (state, { issueEntity = episodeEntities.EPISODES }) => _.get(state, episodeEntity, { items: [] }),
    (issueId, episodes) => {
      return _.find(issues.items, { id: episodeId });
    }
  );
}

export default createIssueSelector;
