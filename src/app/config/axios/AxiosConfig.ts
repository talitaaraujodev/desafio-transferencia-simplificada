import axios from 'axios';

const baseApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
export default baseApi;
