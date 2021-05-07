import http from '../services/httpService'

const postProject = (data) => http.post(`/project`, data)
const regenrateApiKey = (id) => http.put(`/project/${id}`)
const getProjects = () => http.get(`/project`)

export { postProject, getProjects, regenrateApiKey }
