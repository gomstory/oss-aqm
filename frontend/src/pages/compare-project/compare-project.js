import React, { useEffect, useState, useCallback } from 'react';
import Project from "./project-item";
import { useSelector } from 'react-redux'
import SearchProject from './search-project'
import { ProjectWeight } from './project-weight';
import { ProjectMetric } from './project-factor';

function CompareProject() {
    const projects = useSelector(state => state.project.value)
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(option => <option key={option} value={option}>{option}</option>)
    const selectOption = <select>{options}</select>

    return (
        <div className="container">
            <div className='search-container'>
                <SearchProject></SearchProject>
            </div>
            <div className='outer-wrapper'>
                <div className='inner-wrapper'>
                    <ProjectMetric></ProjectMetric>
                    <ProjectWeight></ProjectWeight>
                    {projects.map(project =>
                        <Project key={project.id} project={project} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CompareProject;