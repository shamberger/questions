import { questionService } from 'services';
import * as types from 'constants/ActionTypes';

const fetchData = () => {
  return {
    type: types.GET_QUESTIONS,
    promise: questionService.getQuestions()
  };
};

export default fetchData;
