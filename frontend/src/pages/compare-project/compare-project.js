import React from 'react';
import Project from "./project-item";
import { useSelector } from 'react-redux'
import SearchProject from './search-project'
import { ProjectWeight } from './project-weight';
import { ProjectMetric } from './project-factor';

function CompareProject() {
    const projects = useSelector(state => state.project.value)
    return (
        <div className="container">
            <div className='search-container'>
                <SearchProject></SearchProject>
            </div>
            <div className='grid-container'>
                <div className='grid-column'>
                    <ProjectMetric></ProjectMetric>
                    <ProjectWeight></ProjectWeight>
                </div>
                <div className='grid-column'>
                    <div className='outer-wrapper'>
                        <div className='inner-wrapper'>
                            {projects.map(project =>
                                <Project key={project.id} project={project} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CompareProject;