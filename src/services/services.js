import axios from 'axios'
import api from './api_config'

export const apiClient = axios.create({
  baseURL: api.MAIN_WEB_ADDRESS_WEATHER,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default apiClient
