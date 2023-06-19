import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeProject } from '../../redux/projectReducer'
import { ScoreCalculator } from './project-calculator'
import { createSelector } from 'reselect'

const selectStateOfWeight = createSelector(
    (state) => state.project.weight,
    (weight) => {
        const states = {}
        for (let field in weight) {
            states[field] = weight[field].disabled ? 'disabled' : ""
        }
        return states
    }
)

function Project({ project }) {
    const dispatch = useDispatch()
    const state = useSelector(selectStateOfWeight)
    const onRemove = () => {
        dispatch(removeProject(project))
    }

    return (
        <div className="card-item project project-item">
            <div className="item-box">
                <div className='item-list'>
                    <span className='project-logo'>
                        <img className='logo' alt={project.github_url} src={project.logo}></img>
                        <a href={project.github_url} target="_blank" hidden rel="noreferrer" className='bold'>{project.name}</a>
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
                    <span>{project.project_size.value}</span>
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
                <div className='item-list two-column' hidden={state.license_type}>
                    <span>{project.license_type.label}</span>
                    <span>{project.license_type.score}</span>
                </div>
            </div>

            <div className="item-box">
            <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list two-column' hidden={state.community_size}>
                    <span>{project.community_size.label}</span>
                    <span>{project.community_size.score} </span>
                </div>
                <div className='item-list two-column' hidden={state.availavility_forum}>
                    <span>{project.availavility_forum.label}</span>
                    <span>{project.availavility_forum.score}</span>
                </div>
                <div className='item-list two-column' hidden={state.support_contributor}>
                    <span>{project.support_contributor.label}</span>
                    <span>{project.support_contributor.score}</span>
                </div>
                <div className='item-list two-column' hidden={state.professional_support}>
                    <span>{project.professional_support.label}</span>
                    <span>{project.professional_support.score}</span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list two-column' hidden={state.maturity}>
                    <span>{project.maturity.label} </span>
                    <span>{project.maturity.score} </span>
                </div>
                <div className='item-list two-column' hidden={state.development_lang_popularity}>
                    <span>{project.development_lang_popularity.label}</span>
                    <span>{project.development_lang_popularity.score}</span>
                </div>
                <div className='item-list two-column' hidden={state.document}>
                    <span>{project.document.label} </span>
                    <span>{project.document.score} </span>
                </div>
                <div className='item-list two-column' hidden={state.learning_material}>
                    <span>{project.learning_material.label} </span>
                    <span>{project.learning_material.score} </span>
                </div>
            </div>

            <div className="item-box" data-attr="Economics">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list two-column' hidden={state.cost}>
                    <span>{project.cost.label} </span>
                    <span>{project.cost.score} </span>
                </div>
                <div className='item-list two-column' hidden={state.new_feature}>
                    <span>{project.new_feature.label}</span>
                    <span>{project.new_feature.score}</span>
                </div>
                <div className='item-list two-column' hidden={state.continuing_change}>
                    <span>{project.continuing_change.label} </span>
                    <span>{project.continuing_change.score} </span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list hide'>
                    <span className='bold'>Empty</span>
                </div>
                <div className='item-list two-column' hidden={state.code_quality}>
                    <span>{project.code_quality.label} </span>
                    <span>{project.code_quality.score} </span>
                </div>
                <div className='item-list two-column' hidden={state.reliability}>
                    <span>{project.reliability.label} </span>
                    <span>{project.reliability.score} </span>
                </div>
                <div className='item-list two-column' hidden={state.maintainability}>
                    <span>{project.maintainability.label} </span>
                    <span>{project.maintainability.score} </span>
                </div>
                <div className='item-list two-column' hidden={state.security}>
                    <span>{project.security.label} </span>
                    <span>{project.security.score} </span>
                </div>
                <div className='item-list two-column' hidden={state.testibility}>
                    <span>{project.testibility.label}</span>
                    <span>{project.testibility.score} </span>
                </div>
                <div className='item-list two-column' hidden={state.co_existence}>
                    <span>{project.co_existence.label}</span>
                    <span>{project.co_existence.score} </span>
                </div>
                <div className='item-list two-column' hidden={state.performance}>
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