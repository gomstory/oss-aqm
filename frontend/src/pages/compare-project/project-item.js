import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeProject } from '../../redux/projectReducer'
import { ScoreCalculator } from './project-calculator'

function Project({ project }) {
    console.log(project)
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
                    <span>{project.project_size.label}</span>
                    <span>{project.project_size.score}</span>
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
                    <span>{project.license_type.label}</span>
                    <span>{project.license_type.score}</span>
                </div>
            </div>

            <div className="item-box">
            <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.community_size.label}</span>
                    <span>{project.community_size.score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.availavility_forum.label}</span>
                    <span>{project.availavility_forum.score}</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.support_contributor.label}</span>
                    <span>{project.support_contributor.score}</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.professional_support.label}</span>
                    <span>{project.professional_support.score}</span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.maturity.label} </span>
                    <span>{project.maturity.score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.development_lang_popularity.label}</span>
                    <span>{project.development_lang_popularity.score}</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.document.label} </span>
                    <span>{project.document.score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.learning_material.label} </span>
                    <span>{project.learning_material.score} </span>
                </div>
            </div>

            <div className="item-box" data-attr="Economics">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.cost.label} </span>
                    <span>{project.cost.score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.new_feature.label}</span>
                    <span>{project.new_feature.score}</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.continuing_change.label} </span>
                    <span>{project.continuing_change.score} </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.code_quality.label} </span>
                    <span>{project.code_quality.score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.reliability.label} </span>
                    <span>{project.reliability.score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.maintainability.label} </span>
                    <span>{project.maintainability.score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.security.label} </span>
                    <span>{project.security.score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.testibility.label}</span>
                    <span>{project.testibility.score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.co_existence.label}</span>
                    <span>{project.co_existence.score} </span>
                </div>
                <div className='item-list two-column'>
                    <span>{project.performance.label}</span>
                    <span>{project.performance.score} </span>
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