import React, { useEffect, useState, useCallback } from 'react';
import Project from "../../common/project";
import { addProject } from '../../redux/projectReducer';
import getProject from '../../services/getProject'
import { useSelector, useDispatch } from 'react-redux'

function CompareProject() {
    const projects = useSelector(state => state.project.value)
    const [list, setList] = useState([])
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(option => <option key={option} value={option}>{option}</option>)
    const selectOption = <select>{options}</select>
    const dispatch = useDispatch()

    useEffect(() => {
        getProject()
            .then(items => {
                setList(items)
            })
    }, [])

    const sendRequest = () => {
        const project = list.pop()
        dispatch(addProject(project))
    }

    return (
        <div className="container">
            <input className="search-project" name="search" placeholder="Enter Project Name"></input>
            <button onClick={sendRequest}>Add Project</button>
            <div className="flex middle space-between">
                <h1>Compare Projects</h1>
            </div>
            <div className="project metric">
                <h1 className="clear pt-8 pb-8">Project Name</h1>
                <div className="item-box">
                    <h2>General</h2>
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
                    <h1>License</h1>
                    <div className='item-list'>
                        <span>License Type</span>
                    </div>
                </div>

                <div className="item-box">
                    <h2>Community and Support</h2>
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
                    <h2>Charecteristics</h2>
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
                    <h2>Product Quality</h2>
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
                    <h2>Evaluation Score</h2>
                    <div className='item-list'>
                        <span>Overall Quality</span>
                    </div>
                </div>
            </div>

            <div className="project metric">
                <h1 className="clear pt-8 pb-8">Weighted</h1>
                <div className="item-box">
                    <h2 className='hide'>Project</h2>
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
                    <h1 className='hide'>License</h1>
                    <div className='item-list'>
                        <span>{selectOption}</span>
                    </div>
                </div>

                <div className="item-box">
                    <h2 className='hide'>Community and Support</h2>
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
                    <h2 className='hide'>Charecteristics</h2>
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
                    <h2 className='hide'>Product Quality</h2>
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
                    <h2 className='hide'>Evaluation Score</h2>
                    <div className='item-list'>
                        <span>Overall Quality</span>
                    </div>
                </div>
            </div>

            {projects.map(project => <Project key={project.id} project={project} />)}

        </div>
    )
}

export default CompareProject;