import axios from 'axios';

const service = {
  getCounts: () => axios.get('/counts')
};

export default service;
