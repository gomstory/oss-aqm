import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeProject } from '../../redux/projectReducer'

function Project({ project }) {
    const dispatch = useDispatch()
    const onRemove = () => {
        dispatch(removeProject(project))
    }

    return (
        <div className="card-item project project-item">
            <div className="item-box">
                <div className='item-list'>
                    <span className='project-logo'>
                        <img className='logo' src={project.logo}></img>
                        <a href={project.website} target="_blank" className='title'>{project.name}</a>
                        <button onClick={onRemove} className='clear-project'>Delete</button>
                    </span>
                </div>
                <div className='item-list hide'>
                    <span className='title'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>{project.website}</span>
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
            <div className='item-list hide'>
                    <span className='title'>Empty</span>
                </div>
                <div className='item-list'>
                    <span>{project.license_value || 0} </span>
                </div>
            </div>

            <div className="item-box">
            <div className='item-list hide'>
                    <span className='title'>Empty</span>
                </div>
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
                <div className='item-list hide'>
                    <span className='title'>Empty</span>
                </div>
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
                <div className='item-list hide'>
                    <span className='title'>Empty</span>
                </div>
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
                <div className='item-list hide'>
                    <span>Empty</span>
                </div>
                <div className='item-list'>
                    <span className='title'>10/100</span>
                </div>
            </div>
        </div>
    );
}

export default Project;