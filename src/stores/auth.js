import { defineStore } from 'pinia';
import { postData } from '@/api/index'; // api/index.js에서 postData 함수를 가져옵니다.

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    getUser: (state) => state.user,
  },
  actions: {
    async login(id, password, type) {
      // 공통 API 함수 postData를 사용하여 로그인 요청을 보냅니다.
      try {
        // postData는 성공 시 response.data를 바로 반환합니다.
        const userData = await postData('/Account/login', { id, password, type });        
        this.setUser(userData.data[0]);
        return userData;
      } catch (error) {
        console.error('Login failed:', error);
        return null;  // 로그인 실패
      }
    },
    setUser(user) {
      this.user = user;
    },
    logout() {
      this.user = null;  // 사용자 정보 제거
    },
  },
});