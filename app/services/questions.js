import axios from 'axios';

const service = {
  getQuestions: () => axios.get('/question'),
};

export default service;
