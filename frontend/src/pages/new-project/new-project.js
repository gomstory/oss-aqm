import { useSelector, useDispatch } from 'react-redux';
import { apiConfigs } from '../../services/configs';

function NewProject() {
    const auth = useSelector(state => state.auth.isAuth)
    const loginURL = `${apiConfigs.baseUrl}/oauth/github/login`

    return (
        <div className="container">
            {!auth && (
                <span>
                    You have login to request new project
                    <a href={loginURL} className='btn primary ml-10'>Login to Github</a>
                </span>
                
            )}

            {auth && <h1>Request New Projects</h1>}

        </div>
    )
}

export default NewProject;