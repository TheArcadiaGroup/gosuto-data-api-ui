import http from '../services/httpService'

const pay = (id, data) => http.post(`/payment/stripe/${id}`, data)

export { pay }
