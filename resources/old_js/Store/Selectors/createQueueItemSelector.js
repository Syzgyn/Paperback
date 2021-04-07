import { createSelector } from 'reselect';

function createQueueItemSelector() {
  return createSelector(
    (state, { issueId }) => episodeId,
    (state) => state.queue.details.items,
    (issueId, details) => {
      if (!issueId || !details) {
        return null;
      }

      return details.find((item) => {
        if (item.issue) {
          return item.issue.id === episodeId;
        }

        return false;
      });
    }
  );
}

export default createQueueItemSelector;
