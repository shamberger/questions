import { combineReducers } from 'redux';
import * as types from 'constants/ActionTypes';

const question = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.INCREMENT_LIKE:
      if (state.id === action.id) {
        return { ...state, likes: {count: state.likes.count + 1} };
      }
      return state;
    case types.CREATE_ANSWER_SUCCESS:
      if (state.id === action.qid) {
        state.answers.push(action.answer);
        return { ...state, answers: state.answers};
      }
      return state;
    case types.DESTROY_ANSWER:
      if (state.id === action.qid) {
        return { ...state, answers: state.answers.filter(a => a.id !== action.id)};
      }
      return state;
    case types.REMOVE_TAG:
      if (state.id === action.qid) {
        return { ...state, tags: state.tags.filter(t => t !== action.tag)};
      }
      return state;
    default:
      return state;
  }
};

const questions = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_QUESTIONS_SUCCESS:
      if (action.res && action.res.data) return action.res.data;
      return state;
    case types.CREATE_ANSWER_SUCCESS:
    case types.DESTROY_ANSWER:
    case types.INCREMENT_LIKE:
    case types.REMOVE_TAG:
      return state.map(q => question(q, action));
    case types.DESTROY_QUESTION:
      return state.filter(q => q.id !== action.id);
    default:
      return state;
  }
};

const questionReducer = combineReducers({
  questions
});

export default questionReducer;
