import http from '../services/httpService'
const getRequests = () => http.get(`/request`)
const getAllToday = () => http.get(`/request/today`)
const getTopMethods = () => http.get(`/request/top`)
export { getRequests, getAllToday, getTopMethods }
