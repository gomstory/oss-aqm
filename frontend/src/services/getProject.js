import {configs} from './configs'
import axios from 'axios'

export default function getProject() {
    return axios.get(`${configs.apiUrl}/project`)
        .then(res => res.data)
        .then(res => res.items)
}