import { apiConfigs } from './configs'
import axios from 'axios'

export function createCrawler(url, user) {
    return axios.post(`${apiConfigs.baseUrl}/crawler`, {
        github_url: url,
        user: user
    })
    .then(res => res.data)
    .then(res => res.items)
}

export function getCrawler() {
    return axios.get(`${apiConfigs.baseUrl}/crawler`)
    .then(res => res.data)
    .then(res => res.items)
}