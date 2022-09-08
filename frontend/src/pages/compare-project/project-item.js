import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeProject } from '../../redux/projectReducer'
import { ScoreCalculator } from './project-score'

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
                        <a href={project.github_url} target="_blank" className='bold'>{project.name}</a>
                        <button onClick={onRemove} className='clear-project'>Delete</button>
                    </span>
                </div>
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list'>
                    <span><a href={project.website}>{project.website}</a></span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.project_size_label} lines </span>
                    <span>{project.project_size_score} </span>
                </div>
                <div className='item-list'>
                    <span>{project.stars} stars</span>
                </div>
                <div className='item-list'>
                    <span>{project.day_since_created} days</span>
                </div>
                <div className='item-list'>
                    <span>{project.used_by} repositories</span>
                </div>
                <div className='item-list'>
                    <span>{project.forks} repositories</span>
                </div>
            </div>

            <div className="item-box">
            <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.license_value} </span>
                    <span>{project.license_score} </span>
                </div>
            </div>

            <div className="item-box">
            <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.community_size_label} people </span>
                    <span>{project.community_size_score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.availavility_forum_label}</span>
                    <span>{project.availavility_forum_score}</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.contributor_label} people</span>
                    <span>{project.contributor_score}</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.professional_support_label}</span>
                    <span>{project.professional_support_score}</span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.maturity_label} </span>
                    <span>{project.maturity_score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.document_label} </span>
                    <span>{project.document_score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.development_lang_value}</span>
                    <span>{project.development_lang_score}</span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.security_label} </span>
                    <span>{project.security_score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.code_quality_label} </span>
                    <span>{project.code_quality_score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.testibility_value} complexity</span>
                    <span>{project.testibility_score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.maintainability_label} </span>
                    <span>{project.maintainability_score} </span>
                </div>
                {/* <div className='item-list two-column'>
                    <span>{project.popularity_label} </span>
                    <span>{project.popularity_score} </span>
                </div> */}
                <div className='item-list two-column'>
                    <span>{project.reliability_label} </span>
                    <span>{project.reliability_score} </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span className='bold'>Score</span>
                    <ScoreCalculator project={project}></ScoreCalculator>
                </div>
            </div>
        </div>
    );
}

export default Project;