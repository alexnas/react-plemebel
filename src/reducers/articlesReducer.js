import * as R from 'ramda';
import { FETCH_ARTICLES_SUCCESS } from '../actions/actionTypes';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ARTICLES_SUCCESS:
      const newArticles = R.indexBy(R.prop('id'), payload);
      return R.merge(state, newArticles);
    default:
      return state;
  }
};
