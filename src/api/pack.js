import http from '../services/httpService'

const getPack = (id) => http.post(`/pack/${id}`)
const getPacks = () => http.get(`/pack`)
const selectFreePlan = () => http.get(`/pack/selectFreePlan`)

export { getPack, getPacks, selectFreePlan }
