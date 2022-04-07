import axios from 'axios';
import LocalStorage from '../../utils/storage/local-storage';

const user = {
  namespaced: true,
  state: {
    accessToken: null
  },
  actions: {
    loginUser({ commit }, userData) {
      return axios.post('http://localhost:8000/signin', userData)
        .then((response) => {
          commit('setAccessToken', response.data.accessToken);
        })
        .catch((error) => {
          console.log(error);
          // throw new Error(error);
          // if (error.response.status === 401) {
          //   this.$router.push({
          //     name: 'LoginPage'
          //   });
          // }
        });
    },
    registerUser({ commit }, userData) {
      return axios.post('http://localhost:8000/signup', userData)
        .then((response) => {
          commit('setAccessToken', response.data.accessToken);
        })
        .catch((error) => { console.error(error); });
    },
    verifyAuth({ rootGetters, commit }) {
      const config = {
        method: 'get',
        url: 'http://localhost:8000/authenticate',
        headers: {
          'Access-Control-Allow-Origin': '*',
          authorization: `Bearer ${rootGetters['user/getAccessToken']}`
        }
      };
      const request = axios(config);
      return request
        .catch(() => { commit('removeAccessToken'); });
    }
  },
  mutations: {
    setAccessToken: (state, token) => {
      state.accessToken = token;
      LocalStorage.setItem('Auth', token);
    },
    removeAccessToken: (state) => {
      LocalStorage.removeItem('Auth');
      state.accessToken = null;
    }
  },
  getters: {
    getAccessToken: (state) => LocalStorage.getItem('Auth') || state.accessToken
  }
};

export default user;
