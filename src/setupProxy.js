const { createProxyMiddleware } = require('http-proxy-middleware')

let API_URL = ''
process.env.NODE_ENV === 'production'
  ? (API_URL = 'https://casper.gosuto.io')
  : (API_URL = 'http://localhost:3001')

//const API_URL = process.env.API_URL || 'http://localhost:3000/'

module.exports = function (app) {
  app.use(createProxyMiddleware('/api/*', { target: API_URL }))
  app.use(createProxyMiddleware('/api/**/*', { target: API_URL }))
}
