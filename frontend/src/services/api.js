import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const getLocations = () => api.get('/get_location_names')

export const predictPrice = (data) => api.post('/predict_home_price', data)
