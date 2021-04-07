import $ from 'jquery';
import createAjaxRequest from '@/Utilities/createAjaxRequest';
import { set, removeItem } from '../baseActions';

function createRemoveItemHandler(section, url) {
  return function(getState, payload, dispatch) {
    const {
      id,
      ...queryParams
    } = payload;

    dispatch(set({ section, isDeleting: true }));

    const ajaxOptions = {
      url: `${url}/${id}?${$.param(queryParams, true)}`,
      method: 'DELETE'
    };

    const promise = createAjaxRequest(ajaxOptions).request;

    promise.done((data) => {
      dispatch(
        set({
          section,
          isDeleting: false,
          deleteError: null
        }));

      dispatch(
        removeItem({ section, id })
      );
    });

    promise.fail((xhr) => {
      dispatch(set({
        section,
        isDeleting: false,
        deleteError: xhr
      }));
    });

    return promise;
  };
}

export default createRemoveItemHandler;
