import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiConfigs } from '../../services/configs';
import { useLocation } from "react-router-dom";
import { login, logout, setUser } from '../../redux/authReducer';
import { createCrawler, getCrawler, getME } from '../../services';


function NewProject(props) {
    const auth = useSelector(state => state.auth.isAuth)
    const token = useSelector(state => state.auth.auth)
    const user = useSelector(state => state.auth.user)
    const [reqList, setReqList] = useState([])
    const loginURL = `${apiConfigs.baseUrl}/oauth/github/login`;
    const location = useLocation()
    const dispatch = useDispatch()
    const inputEl = useRef(null);

    // Used to authentication
    useEffect(() => {
        const localToken = window.localStorage.getItem('token')
        const params = new URLSearchParams(location.search)
        const token = params.get('access_token')

        if (token && !localToken) {
            window.localStorage.setItem('token', token)
            window.location.replace("/oss-aqm#/new")
        } else if (localToken) {
            loginUser(localToken)
            loadRequest();
        }
    }, [auth])

    // Used to get user info
    useEffect(() => {
        if (token && !user) {
            getME(token).then(username => {
                dispatch(setUser(username))
            }).catch(() => {
                onLogout()
            })
        }

    }, [token, user])

    const loadRequest = () => {
        if (auth) {
            getCrawler()
                .then(list => {
                    setReqList(list)
                })
        }
    }

    const loginUser = (token) => {
        dispatch(login(token))
    }

    const refreshTable = () => {
        setReqList([])
        loadRequest()
    }

    const createRequest = () => {
        const url = inputEl.current.value;
        const username = user;
        if (!url) return;
        return createCrawler(url, user)
            .then(() => inputEl.current.value = "")
    }

    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <div className="container">
            {!auth && (
                <span>
                    You have login to request new project
                    <a href={loginURL} className='btn primary ml-10'>Login to Github</a>
                </span>

            )}

            {auth && user &&
                <div className='mt-20'>
                    <h1>Loged in by {user}</h1>
                    <button className='btn primary ml-10' onClick={onLogout}>Logout</button>
                </div>
            }

            {auth &&
                <div className='mt-20'>
                    <h1>Request New Github Projects</h1>
                    <input className='text-input' ref={inputEl} type="text" placeholder="Please Enter Github URL" />
                    <button className='btn primary ml-10' onClick={createRequest}>Create</button>
                    <button className='btn primary ml-10' onClick={refreshTable}>Refresh</button>
                </div>
            }

            {auth &&
                <div className='mt-20'>
                    <h2 className='bold'>Your request status</h2>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Github</th>
                                <th>Repo Information</th>
                                <th>Release</th>
                                <th>Source Code</th>
                                <th>Users</th>
                                <th>Contributors</th>
                                <th>Language</th>
                                <th>Core Team</th>
                                <th>License</th>
                                <th>Issues</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auth && reqList.map(row => 
                                <tr key={row.github_id}>
                                    <td>{row.github_id}</td>
                                    <td>{row.repo_info_status}</td>
                                    <td>{row.release_status}</td>
                                    <td>{row.source_code_status}</td>
                                    <td>{row.user_status}</td>
                                    <td>{row.contributor_status}</td>
                                    <td>{row.lang_status}</td>
                                    <td>{row.core_team_status}</td>
                                    <td>{row.license_status}</td>
                                    <td>{row.issue_status}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default NewProject;