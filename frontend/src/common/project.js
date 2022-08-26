import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeProject } from '../redux/projectReducer'

function Project({ project }) {
    const dispatch = useDispatch()
    const onRemove = () => {
        dispatch(removeProject(project.id))
    }

    return (
        <div className="project">
            <div className='project-logo'>
                <img className='logo' src='/oss-aqm/logo192.png'></img>
                <a href='#' className='title'>{project.name}</a>
                <button onClick={onRemove} className='clear-project'>X</button>
            </div>

            <div className="item-box">
                <h1 className='hide'>License</h1>
                <div className='item-list'>
                    <span><a href={project.website}>{project.website}</a></span>
                </div>
                <div className='item-list'>
                    <span>{project.project_size_value || 0} </span>
                </div>
                <div className='item-list'>
                    <span>{project.star}</span>
                </div>
                <div className='item-list'>
                    <span>{project.updated_at}</span>
                </div>
            </div>

            <div className="item-box">
                <h1 className='hide'>License</h1>
                <div className='item-list'>
                    <span>{project.license_value || 0} </span>
                </div>
            </div>

            <div className="item-box">
                <h1 className='hide'>Community and Support</h1>
                <div className='item-list'>
                    <span>{project.community_size_value || 0} </span>
                </div>
                <div className='item-list'>
                    <span>{project.avialability || 0}</span>
                </div>
                <div className='item-list'>
                    <span>{project.contributor_value || 0}</span>
                </div>
                <div className='item-list'>
                    <span>{project.professional_support_value || 0}</span>
                </div>
            </div>


            <div className="item-box">
                <h1 className='hide'>Community and Support</h1>
                <div className='item-list'>
                    <span>{project.maturity_value || 0} </span>
                </div>
                <div className='item-list'>
                    <span>{project.document_value || 0} </span>
                </div>
                <div className='item-list'>
                    <span>{project.development_lang_score}</span>
                </div>
            </div>

            <div className="item-box">
                <h1 className='hide'>Product Quality</h1>

                <div className='item-list'>
                    <span>{project.security_value || 0} </span>
                </div>
                <div className='item-list'>
                    <span>{project.code_quality_value || 0} </span>
                </div>
                <div className='item-list'>
                    <span>{project.testibility_value || 0} </span>
                </div>
                <div className='item-list'>
                    <span>{project.maintainability_value || 0} </span>
                </div>
                <div className='item-list'>
                    <span>{project.popularity_value || 0} </span>
                </div>
            </div>


            <div className="item-box">
                <h1 className='hide'>OSS Qiality Score</h1>
                <div className='item-list'>
                    <span>10/100</span>
                </div>
            </div>
        </div>
    );
}

export default Project;