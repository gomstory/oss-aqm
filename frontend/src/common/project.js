import React from 'react';
import ItemList from "./item-list";

function Project() {
    return (
        <div className="project">
            <div className='project-logo'>
                <img className='logo' src='/oss-aqm/logo192.png'></img>
                <a href='#' className='title'>Project A</a>
                <button className='clear-project'>X</button>
            </div>
            <div className="item-box">
                <h1 className='hide'>License</h1>
                <div className='item-list'>
                    <span>Open Hub Data Quality</span>
                </div>
            </div>

            <div className="item-box">
                <h1 className='hide'>Community and Support</h1>
                <div className='item-list'>
                    <span>Open Hub Data Quality</span>
                </div>
                <div className='item-list'>
                    <span>Open Hub Data Quality</span>
                </div>
                <div className='item-list'>
                    <span>Open Hub Data Quality</span>
                </div>
                <div className='item-list'>
                    <span>Open Hub Data Quality</span>
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