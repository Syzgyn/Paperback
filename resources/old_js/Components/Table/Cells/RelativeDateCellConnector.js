import _ from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import UISettingsSelector from '@/Store/Slices/Settings/ui';
import RelativeDateCell from './RelativeDateCell';

function createMapStateToProps() {
  return createSelector(
    UISettingsSelector,
    (uiSettings) => {
      return _.pick(uiSettings, [
        'showRelativeDates',
        'shortDateFormat',
        'longDateFormat',
        'timeFormat'
      ]);
    }
  );
}

export default connect(createMapStateToProps, null)(RelativeDateCell);
