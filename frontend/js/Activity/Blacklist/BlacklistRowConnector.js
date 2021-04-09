import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { removeBlacklistItem } from 'Store/Actions/blacklistActions';
import createComicSelector from 'Store/Selectors/createComicSelector';
import BlacklistRow from './BlacklistRow';

function createMapStateToProps() {
  return createSelector(
    createComicSelector(),
    (comic) => {
      return {
        comic
      };
    }
  );
}

function createMapDispatchToProps(dispatch, props) {
  return {
    onRemovePress() {
      dispatch(removeBlacklistItem({ id: props.id }));
    }
  };
}

export default connect(createMapStateToProps, createMapDispatchToProps)(BlacklistRow);
