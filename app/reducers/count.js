import { combineReducers } from 'redux';
import * as types from 'constants/ActionTypes';

const counts = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_COUNTS_SUCCESS:
      if (action.res && action.res.data) return action.res.data;
      return state;
    case types.CREATE_ANSWER_SUCCESS:
      return {...state, answers: state.answers + 1 }
    case types.DESTROY_ANSWER:
      return {...state, answers: state.answers - 1 }
    case types.INCREMENT_LIKE:
      return {...state, likes: state.likes + 1 }
    default:
      return state;
  }
};

const questionReducer = combineReducers({
  counts
});

export default questionReducer;
