import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://shopeasy-api.herokuapp.com',
})

export default instance
