import http from '../services/httpService'

const pay = (id, data) => http.post(`/payment/stripe/${id}`, data)
const createSubscription = (id, data) =>
  http.post(`/payment/createSubscription/${id}`, data)
const confirmSubscription = (id, data) =>
  http.post(`/payment/confirmSubscription/${id}`, data)
const cancelSubscription = () => http.post(`/payment/cancelSubscription`)
const updateSubscription = (id) => http.post(`/payment/updateSubscription/${id}`)
export {
  pay,
  createSubscription,
  confirmSubscription,
  cancelSubscription,
  updateSubscription
}
