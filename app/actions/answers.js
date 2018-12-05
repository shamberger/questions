/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/ActionTypes';

import {fetchQuestionData, fetchCountData} from 'fetch-data';

polyfill();

export function makeAnswerRequest(method, id, data, api = '/answer') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}


export function createAnswerRequest(data) {
  return {
    type: types.CREATE_ANSWER_REQUEST,
    id: data.id,
    qid: data.qid,
    date: data.date,
    text: data.text
  };
}

export function createAnswerSuccess(qid, answer) {
  return {
    type: types.CREATE_ANSWER_SUCCESS,
    qid,
    answer
  };
}

export function createAnswerFailure(data) {
  return {
    type: types.CREATE_ANSWER_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function destroy(qid, id) {
  return { type: types.DESTROY_ANSWER, qid, id };
}

export function createAnswer(qid, text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;
    const { user } = getState();
    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const data = {
      id,
      text,
      date: new Date().toISOString(),
      author: {
        name: user.profile.name,
        description: user.profile.description
      }
    };

    dispatch(createAnswerRequest(data));

    return makeAnswerRequest('post', qid, data)
      .then(res => {
        if (res.status === 200) {
          return dispatch(createAnswerSuccess(qid, data));
        }
      })
      .catch(() => {
        return dispatch(createAnswerFailure({ id, error: 'Oops! Что-то пошло не так при сохраниении вопроса...'}));
      });
  };
}

export function destroyAnswer(qid, id) {
  return dispatch => {
    return makeAnswerRequest('delete', id)
      .then(() => dispatch(destroy(qid, id)))

      .catch(() => dispatch(createAnswerFailure({qid, error: 'Oops! Что-то пошло не так при удалении вопроса..'})));
  };
}
