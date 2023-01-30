import axios from 'axios'

export const axiosFetch = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
