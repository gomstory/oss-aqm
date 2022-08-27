import { apiConfigs } from './configs'
import axios from 'axios'

export default function getProject(search = "") {
    return axios.get(`${apiConfigs.baseUrl}/project`, { 
        params: {
            "search": search
        }})
        .then(res => res.data)
        .then(res => res.items)
}