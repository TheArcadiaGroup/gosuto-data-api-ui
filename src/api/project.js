import http from '../services/httpService'

const postProject = (data) => http.post(`/project`, data)
const regenrateApiKey = (id) => http.put(`/project/regenrateApiKey/${id}`)
const editProject = (data, id) => http.put(`/project/${id}`, data)
const getProjects = () => http.get(`/project`)
const getProject = (id) => http.get(`/project/${id}`)
const deleteProject = (id) => http.delete(`/project/${id}`)

export {
  postProject,
  getProjects,
  regenrateApiKey,
  deleteProject,
  getProject,
  editProject
}
