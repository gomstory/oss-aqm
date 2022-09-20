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
    const [loading, setLoading] = useState(false)
    const [reqList, setReqList] = useState([])
    const [submit, setSubmit] = useState(false)
    const loginURL = `${apiConfigs.baseUrl}/oauth/github/login`;
    const location = useLocation()
    const dispatch = useDispatch()
    const inputEl = useRef(null);

    useEffect(() => {
        const localToken = window.localStorage.getItem('token')
        const params = new URLSearchParams(location.search)
        const token = params.get('access_token')
        
        // Used to authentication
        if (token && !localToken) {
            window.localStorage.setItem('token', token)
            window.location.replace("/oss-aqm/#/new")
            loginUser(token)
        } else if (localToken && !auth) {
            loginUser(localToken)
            refreshTable();
        }
    }, [])

    useEffect(() => {
        if (token && !user) {
            // Used to get user info
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
                    setLoading(false)
                    setReqList(list)
                })
        }
    }

    const loginUser = (token) => {
        dispatch(login(token))
    }

    const refreshTable = () => {
        setLoading(true)
        loadRequest()
    }

    const createRequest = () => {
        const url = inputEl.current.value;
        const username = user;
        if (!url) return;
        return createCrawler(url, user)
            .then(() => inputEl.current.value = "")
            .then(() => showSubmitMsg())
    }

    const onLogout = () => {
        dispatch(logout())
    }

    const showSubmitMsg = () => {
        setSubmit(true)
        setTimeout(() => {
            setSubmit(false)
        }, 10000)
    }

    return (
        <div className="container">
            {!auth && (
                <span>
                    You have login to request new project
                    <a href={loginURL} className='btn primary ml-10'>Login to Github</a>
                </span>

            )}

            {auth &&
                <div className='mt-20'>
                    <h1>Request New Github Projects</h1>
                    <input className='text-input' ref={inputEl} type="text" placeholder="Please Enter Github URL" />
                    <button className='btn primary ml-10' onClick={createRequest}>Submit Request</button>
                    { submit && <p className='mt-5 green'>Your request has been submitted, after few minutes the recrod will be displayed</p> } 
                </div>
            }

            {auth &&
                <div className='mt-20'>
                    <h2 className='bold'>Your request status (👤: {user})</h2>

                    <div className='mt-20 mb-20'>
                        <button className='btn primary ml-10' onClick={onLogout}>Logout</button>
                        <button className='btn primary ml-10' onClick={refreshTable}>Refresh Status</button>
                    </div>

                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Github Project</th>
                                <th>Repo Information</th>
                                <th>Release</th>
                                <th>Source Code</th>
                                <th>User</th>
                                <th>Contributor</th>
                                <th>Language</th>
                                <th>Core Team</th>
                                <th>License</th>
                                <th>Issue</th>
                                <th>Forum</th>
                                <th>Requested By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {auth && !loading && reqList.map(row =>
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
                                    <td>{row.forum_status}</td>
                                    <td>{row.requestor}</td>
                                </tr>
                            )}

                            {auth && !loading && reqList.length == 0 && (
                                <tr><td className='text-center' colSpan={12}>No project in progress</td></tr> 
                            )}

                            {auth && loading && (
                                <tr><td className='text-center' colSpan={12}>Loading...</td></tr> 
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default NewProject;