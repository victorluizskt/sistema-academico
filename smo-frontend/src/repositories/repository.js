import api from '../utils/api';

export default class Repository {
  checkUser = async (data) => {
    try {
      return await api.post('/login', data);
    } catch(error) {
      return error;
    }
  }
}
