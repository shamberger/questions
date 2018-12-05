import { combineReducers } from 'redux';
import user from 'reducers/user';
import question from 'reducers/question';
import count from 'reducers/count';
import message from 'reducers/message';
import { routerReducer as routing } from 'react-router-redux';
import * as types from 'constants/ActionTypes';

const isFetching = ( state = false, action ) => {
  switch (action.type) {
    case types.FETCH_DATA_REQUEST:
      return true;
    case types.FETCH_DATA_SUCCESS:
    case types.FETCH_DATA_FAILURE:
      return false;
    default:
      return state;
  }
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  isFetching,
  question,
  count,
  user,
  message,
  routing
});

export default rootReducer;
