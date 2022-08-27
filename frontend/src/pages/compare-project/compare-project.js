import React, { useEffect, useState, useCallback } from 'react';
import Project from "./project-item";
import { useSelector } from 'react-redux'
import SearchProject from './search-project'

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
                    <div className="card-item project metric">
                        <div className="item-box">
                            <div className='item-list'>
                                <span className='title'>Quality Factors</span>
                            </div>
                            <div className='item-list'>
                                <span className='title'>General</span>
                            </div>
                            <div className='item-list'>
                                <span>Website</span>
                            </div>
                            <div className='item-list'>
                                <span>Project Size</span>
                            </div>
                            <div className='item-list'>
                                <span>Project Stars</span>
                            </div>
                            <div className='item-list'>
                                <span>Create At</span>
                            </div>
                        </div>

                        <div className="item-box">
                            <div className='item-list'>
                                <span className='title'>License</span>
                            </div>
                            <div className='item-list'>
                                <span>License Type</span>
                            </div>
                        </div>

                        <div className="item-box">
                            <div className='item-list'>
                                <span className='title'>Community and Support</span>
                            </div>
                            <div className='item-list'>
                                <span>Community Size</span>
                            </div>
                            <div className='item-list'>
                                <span>Availability of Forum</span>
                            </div>
                            <div className='item-list'>
                                <span>Contribution</span>
                            </div>
                            <div className='item-list'>
                                <span>Quality of Professional Support</span>
                            </div>
                        </div>

                        <div className="item-box">
                            <div className='item-list'>
                                <span className='title'>Characteristics</span>
                            </div>
                            <div className='item-list'>
                                <span>Maturity</span>
                            </div>
                            <div className='item-list'>
                                <span>Documentation</span>
                            </div>
                            <div className='item-list'>
                                <span>Development Language</span>
                            </div>
                        </div>

                        <div className="item-box">
                            <div className='item-list'>
                                <span className='title'>Product Quality</span>
                            </div>
                            <div className='item-list'>
                                <span>Security</span>
                            </div>
                            <div className='item-list'>
                                <span>Code Quality</span>
                            </div>
                            <div className='item-list'>
                                <span>Testibility</span>
                            </div>
                            <div className='item-list'>
                                <span>Maintainability</span>
                            </div>
                            <div className='item-list'>
                                <span>Popularity</span>
                            </div>
                        </div>

                        <div className="item-box">
                            <div className='item-list'>
                                <span className='title'>Overall Quality</span>
                            </div>
                            <div className='item-list'>
                                <span>Quality Scores</span>
                            </div>
                        </div>
                    </div>

                    <div className="card-item project metric weighted">
                        <div className="item-box">
                            <div className='item-list'>
                                <span className='title'>Weight</span>
                            </div>
                            <div className='item-list hide'>
                                <span className='title'>Empty</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                        </div>

                        <div className="item-box">
                            <div className='item-list hide'>
                                <span className='title'>Empty</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                        </div>

                        <div className="item-box">
                            <div className='item-list hide'>
                                <span className='title'>Empty</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                        </div>

                        <div className="item-box">
                            <div className='item-list hide'>
                                <span className='title'>Empty</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                        </div>

                        <div className="item-box">
                            <div className='item-list hide'>
                                <span className='title'>Empty</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                            <div className='item-list'>
                                <span>{selectOption}</span>
                            </div>
                        </div>

                        <div className="item-box">
                            <div className='item-list hide'>
                                <span className='title'>Empty</span>
                            </div>
                            <div className='item-list hide'>
                                <span>Overall Quality</span>
                            </div>
                        </div>
                    </div>

                    {projects
                        .map(project =>
                            <Project key={project.id} project={project} />)}
                </div>
            </div>
        </div>
    )
}

export default CompareProject;