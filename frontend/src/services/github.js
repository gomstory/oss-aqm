import { apiConfigs } from './configs'
import axios from 'axios'

export function getME(token) {
    return axios.get(`https://api.github.com/user`, {
        headers: {
            "Authorization" : `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .then(res => res.login)
}