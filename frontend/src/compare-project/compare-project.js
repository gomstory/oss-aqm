import Project from "../common/project";

function CompareProject() {
    return (
        <div className="container">
            <div className="flex middle space-between">
                <h1>Compare Projects</h1>
                <input className="search-project" name="search" placeholder="Enter project name"></input>
            </div>
            <div className="project metric">
                <h1 className="clear pt-8 pb-8">Quality Metrics</h1>
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
                    <h2>OSS Qiality Score</h2>
                    <div className='item-list'>
                        <span>Overall Quality</span>
                    </div>
                </div>
            </div>

            <Project></Project>
            <Project></Project>
        </div>
    )
}

export default CompareProject;