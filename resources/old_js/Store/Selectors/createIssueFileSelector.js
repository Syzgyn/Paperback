import { createSelector } from 'reselect';

function createIssueFileSelector() {
  return createSelector(
    (state, { issueFileId }) => episodeFileId,
    (state) => state.issueFiles,
    (issueFileId, episodeFiles) => {
      if (!issueFileId) {
        return;
      }

      return issueFiles.items.find((episodeFile) => episodeFile.id === episodeFileId);
    }
  );
}

export default createIssueFileSelector;
