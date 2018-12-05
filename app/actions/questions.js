/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/ActionTypes';

import {fetchQuestionData, fetchCountData} from 'fetch-data';

polyfill();

export function makeQuestionRequest(method, id, data, api = '/question') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function fetchTopics() {
  return {
    type: types.GET_TOPICS,
    promise: makeTopicRequest('get')
  };
}

export function createQuestionRequest(data) {
  return {
    type: types.CREATE_QUESTION_REQUEST,
    id: data.id,
    date: data.date,
    text: data.text
  };
}

export function createQuestionSuccess(message) {
  return {
    type: types.CREATE_QUESTION_SUCCESS,
    message
  };
}

export function questionFailure(data) {
  return {
    type: types.QUESTION_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function destroy(id) {
  return { type: types.DESTROY_QUESTION, id };
}

export function createQuestionDuplicate() {
  return {
    type: types.CREATE_QUESTION_DUPLICATE
  };
}

export function removeTagSuccess(qid, tag) {
  return { type: types.REMOVE_TAG, qid, tag };
}

export function incrementLike(id) {
  return { type: types.INCREMENT_LIKE, id };
}

export function createQuestion(text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { question } = getState();
    const data = {
      date: new Date().toISOString(),
      id,
      tags: ['не проверен'],
      text
    };

    // Conditional dispatch
    // If the topic already exists, make sure we emit a dispatch event
    if (question.questions.filter(questionItem => questionItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate topic
      return dispatch(createQuestionDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createQuestionRequest(data));

    return makeQuestionRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createQuestionSuccess('Ваш вопрос успешно добавлен и отправлен на модерацию.'));
        }
      })
      .catch(() => {
        return dispatch(questionFailure({ id, error: 'Oops! что то пошло не так!'}));
      });
  };
}

export function removeTag(qid, tag) {
  return dispatch => {
    return makeQuestionRequest('put', qid, {
        isFull: false,
        isIncrement: false,
        removeTag: tag
      })
      .then(() => dispatch(removeTagSuccess(qid, tag)))
      .catch(() => dispatch(questionFailure({qid, error: 'Oops! что то пошло не так!'})));
  };
}

export function incrementLikeCount(id) {
  return dispatch => {
    return makeQuestionRequest('put', id, {
        isFull: false,
        isIncrement: true
      })
      .then(() => dispatch(incrementLike(id)))
      .catch(() => dispatch(questionFailure({id, error: 'Oops! что то пошло не так!'})));
  };
}

export function destroyQuestion(id) {
  return dispatch => {
    return makeQuestionRequest('delete', id)
      .then(() => {
        dispatch(destroy(id));
        dispatch(fetchCountData());
      })

      .catch(() => dispatch(questionFailure({id, error: 'Oops! Что-то пощло не так при удалении вопроса..'})));
  };
}
