import { apiConfigs } from './configs'
import axios from 'axios'

export default function getProject() {
    return axios.get(`${apiConfigs.baseUrl}/project`)
        .then(res => res.data)
        .then(res => res.items)
}