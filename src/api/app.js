import axios from 'axios'

export const app = axios.create({
  baseURL: 'http://192.168.6.20:3010'
})

// export const createSession = async (email, senha) => {
//   return app.get('/disciplinas', { email, senha })
// }
