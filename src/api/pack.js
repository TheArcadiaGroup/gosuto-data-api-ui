import http from '../services/httpService'

const getPack = (id) => http.post(`/pack/${id}`)
const getPacks = () => http.get(`/pack`)

export { getPack, getPacks }
