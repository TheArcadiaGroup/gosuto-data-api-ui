import http from '../services/httpService'
const getStat = () => http.get(`/stat`)
const getStatForbarChart = () => http.get(`/stat/barChartStat`)
export { getStat, getStatForbarChart }
