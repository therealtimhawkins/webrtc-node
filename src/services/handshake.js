import * as axios from 'axios'
import { logger } from '../services/logger'

export const makeResponse = async (data, handshakeResponse, id) => {
  data.handshakeResponse = handshakeResponse
  data.responseId = id

  const response = await axios({
    method: 'post',
    url: 'http://localhost:1992/handshake/response',
    data
  })

  return response
}

export const getResponse = async id => {
  const response = await axios({
    method: 'get',
    url: 'http://localhost:1992/handshake/response/' + id
  })

  logger('getResponse', 'data', response.data)
  return response
}

export const request = async (id, handshake) => {
  const response = await axios({
    method: 'post',
    url: 'http://localhost:1992/handshake',
    data: {
      requestId: id,
      handshake: handshake
    }
  })

  logger('requestHandshake', response.data)
  return response.status === 200
}

export const get = async () => {
  const response = await axios.get('http://localhost:1992/handshake/queued')
  const allHandshakes = response.data
  return allHandshakes
}
