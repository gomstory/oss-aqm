export function ProjectMetric() {
    return (
        <div className="card-item project metric">
            <div className="item-box">
                <div className='item-list'>
                    <span className='bold'>Information</span>
                </div>
                <div className='item-list'>
                    <span className='bold'>General</span>
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
                    <span>Days Since Created</span>
                </div>
                <div className='item-list'>
                    <span>Used By</span>
                </div>
                <div className='item-list'>
                    <span>Number of Forks</span>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list'>
                    <span className='bold'>License</span>
                </div>
                <div className='item-list'>
                    <div class="tooltip">
                        <span>License Type</span>
                        <span class="tooltiptext">
                            <span className="title">License Type</span>
                            <span className="definition">
                                Open source software license and permission to distribute software or source code.
                            </span>
                            <span className="metric">
                                <p>Value: License Type</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list'>
                    <span className='bold'>Community and Support</span>
                </div>
                <div className='item-list'>
                    <div class="tooltip">
                        <span>Community Size</span>
                        <span class="tooltiptext">
                            <span className="title">Community Size</span>
                            <span className="definition">
                                Number of Core team, contributors and watchers of the project.
                            </span>
                            <span className="metric">
                                <p>Value: Total number of people</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div class="tooltip">
                        <span>Availability of Forum</span>
                        <span class="tooltiptext">
                            <span className="title">Availability of Forum</span>
                            <span className="definition">
                                Average number of questions with answers in forum in the last 6 months.
                            </span>
                            <span className="metric">
                                <p>Value: Number of question with answers</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div class="tooltip">
                        <span>Support Contributors</span>
                        <span class="tooltiptext">
                            <span className="title">Support Contributors</span>
                            <span className="definition">
                                Number of core developers and contributors in the last 6 months.
                            </span>
                            <span className="metric">
                                <p>Value: Total number of core developers, contributors</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div class="tooltip">
                        <span>Quality of Professional Support</span>
                        <span class="tooltiptext">
                            <span className="title">Quality of Professional Support</span>
                            <span className="definition">
                                Number of supported issues and supoorted pull requests. If there are no reported issues,
                                it is a sign that information and help has been provided sufficiently for users to efficiently resolve issues that they come across.
                            </span>
                            <span className="metric">
                                <p>Value: Support issue rate/support pull request rate</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list'>
                    <span className='bold'>Operational SW Characteristics</span>
                </div>
                <div className='item-list'>
                    <div class="tooltip">
                        <span>Maturity</span>
                        <span class="tooltiptext">
                            <span className="title">Maturity</span>
                            <span className="definition">
                                The degree to which the open source meets needs for reliability under normal operation. It consists of two quality metric elements:
                                <ul>
                                    <li>• Age is age of project repository from created date to last update.</li>
                                    <li>• Bugless code refers to a characteristic of the code with small number of bugs in the last 6 months
                                        which indicates that the open source is likely to be mature and work correctly under normal operation.</li>
                                    <li>• Total minor release refers to how many release in the past 6 months</li>
                                </ul>
                            </span>
                            <span className="metric">
                                <p>Value: Age in days/Total issues/Total minor release</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div class="tooltip">
                        <span>Code Documentation</span>
                        <span class="tooltiptext">
                            <span className="title">Code Documentation</span>
                            <span className="definition">
                                The degree to which the code documentation of the open source software is made available for effective use of the open source.
                                Code Comments refers to the amount of code comments that can be later generated as API documents.
                            </span>
                            <span className="metric">
                                <p>Value: Number of comment lines/Number of code lines</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div class="tooltip">
                        <span>Development Language</span>
                        <span class="tooltiptext">
                            <span className="title">Development Language</span>
                            <span className="definition">
                                Use of popular development languages which makes it easier to manage project operation and maintenance.
                            </span>
                            <span className="metric">
                                <p>Value: Primary language in repository</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list'>
                    <span className='bold'>Product Quality</span>
                </div>
                <div className='item-list'>
                    <div class="tooltip">
                        <span>Security</span>
                        <span class="tooltiptext">
                            <span className="title">Security</span>
                            <span className="definition">
                                Rating that indicates severity of the vulnerability issues in the project.
                                Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-7"><code>security_rating</code> Metric</a>
                            </span>
                            <span className="metric">
                                <p>Value: Security rating label, A = 0 Vulnerabilities, B = at least 1 Minor Vulnerability,C = at least 1 Major Vulnerability, D = at least 1 Critical Vulnerability, E = at least 1 Blocker Vulnerability</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div class="tooltip">
                        <span>Code Quality</span>
                        <span class="tooltiptext">
                            <span className="title">Code Quality</span>
                            <span className="definition">
                                The degree to which the code of the open source software exhibits good quality for long-term maintenance. It consists of two quality metric elements:
                                <ul>
                                    <li>• Uncomplex Code refers to a characteristic of the code with less degree of cyclomatic complexity which indicates that the code has better quality.</li>
                                    <li>• Unduplicated Code refers to a characteristic of the code with less degree of duplications which indicates that the code has better quality.</li>
                                </ul>
                            </span>
                            <span className="metric">
                                <p>Value: Uncomplex code rate/Unduplicated code rate</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div class="tooltip">
                        <span>Testibility</span>
                        <span class="tooltiptext">
                            <span className="title">Testibility</span>
                            <span className="definition">
                                Uncomplex Code refers to a characteristic of the code with less degree of cyclomatic complexity 
                                which indicates that there is less number of paths through the code, making it less complex to test.
                            </span>
                            <span className="metric">
                                <p>Value: Average complexity</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div class="tooltip">
                        <span>Maintainability</span>
                        <span class="tooltiptext">
                            <span className="title">Maintainability</span>
                            <span className="definition">
                                (Formerly the SQALE rating.) Rating given to the project related to the value of the Technical Debt Ratio.
                                Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-4"><code>sqale_rating</code> Metric</a>
                            </span>
                            <span className="metric">
                                <p>Value: SQALE rating label, A=0-0.05, B=0.06-0.1, C=0.11-0.20, D=0.21-0.5, E=0.51-1</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                {/* <div className='item-list'>
                    <div class="tooltip">
                        <span>Popularity*</span>
                        <span class="tooltiptext">
                            <span className="title">Popularity</span>
                            <span className="definition">
                                (Formerly the SQALE rating.) Rating given to the project related to the value of the Technical Debt Ratio.
                                Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-4"><code>sqale_rating</code> Metric</a>
                            </span>
                            <span className="metric">
                                <p>Value: Number of Stars/Number of Users</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div> */}
                <div className='item-list'>
                    <div class="tooltip">
                        <span>Reliability</span>
                        <span class="tooltiptext">
                            <span className="title">Reliability</span>
                            <span className="definition">
                                The degree of how well open source works without bugs or blockers.
                                Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-6"><code>reliability_rating</code> Metric</a>
                                <ul>
                                    <li>A = 0 Bugs</li>
                                    <li>B = at least 1 Minor Bug</li>
                                    <li>C = at least 1 Major Bug</li>
                                    <li>D = at least 1 Critical Bug</li>
                                    <li>E = at least 1 Blocker Bug</li>
                                </ul>
                            </span>
                            <span className="metric">
                                <p>Value: Reliability rating label</p>
                                <p>Score: 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list'>
                    <span className='bold'>Overall Quality</span>
                </div>
                <div className='item-list'>
                    <span>Quality Scores</span>
                </div>
            </div>
        </div>
    )
}