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
                        <a href={project.github_url} target="_blank" className='title'>{project.name}</a>
                        <button onClick={onRemove} className='clear-project'>Delete</button>
                    </span>
                </div>
                <div className='item-list hide'>
                    <span className='title'>Empty</span>
                </div>
                <div className='item-list'>
                    <span><a href={project.website}>{project.website}</a></span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.project_size_value} LOC </span>
                    <span>{project.project_size_score || 0} </span>
                </div>
                <div className='item-list'>
                    <span>{project.star}</span>
                </div>
                <div className='item-list'>
                    <span>{project.age_since}</span>
                </div>
            </div>

            <div className="item-box">
            <div className='item-list hide'>
                    <span className='title'>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.license_value || 0} </span>
                    <span>{project.license_score|| 0} </span>
                </div>
            </div>

            <div className="item-box">
            <div className='item-list hide'>
                    <span className='title'>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.community_size_value} </span>
                    <span>{project.community_size_score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.contributor_value}</span>
                    <span>{project.contributor_score}</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.contributor_value}</span>
                    <span>{project.contributor_score}</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.professional_support_value || 0}</span>
                    <span>{project.professional_support_score || 0}</span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='title'>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.maturity_value || 0} </span>
                    <span>{project.maturity_score || 0} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.document_value || 0} </span>
                    <span>{project.document_score || 0} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.development_lang_value}</span>
                    <span>{project.development_lang_score}</span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='title'>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.security_value || 0} </span>
                    <span>{project.security_score || 0} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.code_quality_value || 0} </span>
                    <span>{project.code_quality_score || 0} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.testibility_value || 0} </span>
                    <span>{project.testibility_score || 0} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.maintainability_value || 0} </span>
                    <span>{project.maintainability_score || 0} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.popularity_value || 0} </span>
                    <span>{project.popularity_score || 0} </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>Total Avg.</span>
                    <span className='title'>10/100</span>
                </div>
            </div>
        </div>
    );
}

export default Project;