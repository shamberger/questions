import { countService } from 'services';
import * as types from 'constants/ActionTypes';

const fetchData = () => {
  return {
    type: types.GET_COUNTS,
    promise: countService.getCounts()
  };
};

export default fetchData;
