import { defineStore } from "pinia";
import { requestToBackend } from '@/services/api.js'

const USER_API = `users`;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
  }),
  actions: {
    async login (username, password) {
      const { payload, statusCode } = await requestToBackend.post(`${USER_API}/login`, {username, password})
      if (statusCode == 200) {
        let accessToken = payload.accessToken
        this.user = accessToken;
        localStorage.setItem('user', JSON.stringify(accessToken))
      }
      return { payload, statusCode }
    },
    logout () {
      this.user = null;
      localStorage.removeItem('user');
    },
    async register (username, email, password, confirmPassword) {
      const { payload, statusCode } = await requestToBackend.post(`${USER_API}/register`, {username, email, password, confirmPassword})
      return { payload, statusCode }
    },
  },
  getters: {
    isLogged: (state) => state.user === null ? false: true
  }
})