import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // 👈 vue.config.js의 프록시 덕분에 /api만 써도 됨
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 응답 인터셉터
api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response?.status === 401) {
    console.warn('인증 오류: 다시 로그인하세요.')
  }
  return Promise.reject(error)
})

export default api

/**
 * POST 요청을 보내는 공통 함수.
 * auth.js와 같은 스토어나 컴포넌트에서 API 호출 로직을 분리하여 재사용성을 높입니다.
 *
 * @template T - API 응답 데이터의 타입을 지정합니다.
 * @param {string} url - 요청을 보낼 API 엔드포인트 URL입니다.
 * @param {any} [data] - 요청 본문(body)에 담아 보낼 데이터입니다. (선택 사항)
 * @param {import('axios').AxiosRequestConfig} [config] - 헤더 등 추가적인 Axios 요청 설정입니다. (선택 사항)
 * @returns {Promise<T>} API 응답의 data 속성을 담은 Promise 객체를 반환합니다.
 */
export const postData = async (url, data, config) => {
  try {
    const response = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    // API 호출 실패 시, 에러를 호출한 쪽으로 다시 던져서
    // 각 상황에 맞는 에러 처리를 할 수 있도록 합니다.
    throw error;
  }
};
