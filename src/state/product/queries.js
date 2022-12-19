import axios from 'axios';
import api from '../../utils/services';
export const loadProducts = () => {
  return axios
    .get(`${api.url}/products`)
    .then(res => res.data)
    .then(res=>console.log(res.data))
    .catch(err => err.response.data);
};
