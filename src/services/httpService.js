import axios from 'axios'
let API_URL = ''
process.env.NODE_ENV === 'production'
  ? (API_URL = '')
  : (API_URL = 'http://localhost:3000')

axios.defaults.baseURL = `${API_URL}/api`
axios.defaults.withCredentials = false

axios.interceptors.response.use(null, (error) => {
  return Promise.reject(error)
})

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
}
