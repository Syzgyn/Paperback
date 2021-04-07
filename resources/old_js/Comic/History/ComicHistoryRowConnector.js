import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchHistory, markAsFailed } from 'Store/Actions/historyActions';
import createComicSelector from 'Store/Selectors/createComicSelector';
import createIssueSelector from 'Store/Selectors/createIssueSelector';
import ComicHistoryRow from './ComicHistoryRow';

function createMapStateToProps() {
  return createSelector(
    createComicSelector(),
    createIssueSelector(),
    (comic, episode) => {
      return {
        comic,
        episode
      };
    }
  );
}

const mapDispatchToProps = {
  fetchHistory,
  markAsFailed
};

export default connect(createMapStateToProps, mapDispatchToProps)(ComicHistoryRow);
