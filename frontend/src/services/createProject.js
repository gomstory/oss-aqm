import {configs} from './configs'

export default function getProject() {
    return fetch(`${configs.apiUrl}/projects`)
        .then(data => data.json())
}