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
                    <div className="tooltip">
                        <span>Project Size</span>
                        <span className="tooltiptext">
                            <span className="title">Project Size</span>
                            <span className="definition">
                                Number of physical lines that contain at least one character which is neither a whitespace nor a tabulation nor part of a comment.
                                Check <a target="_blank" rel="noreferrer" href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-8">ncloc</a>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="row">
                                    <span>XS</span>
                                    <span>&lt; 1k</span>
                                </div>
                                <div className="row">
                                    <span>S</span>
                                    <span>1k - 10k</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>10k - 100k</span>
                                </div>
                                <div className="row">
                                    <span>L</span>
                                    <span>100k - 500k</span>
                                </div>
                                <div className="row">
                                    <span>XL</span>
                                    <span>&gt; 500k</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Number of line of code</p>
                                <p>Right: Project size level</p>
                            </span>
                        </span>
                    </div>
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
                    <span className='bold'>Software License</span>
                </div>
                <div className='item-list'>
                    <span className="sub-factor">License</span>
                    <div className="tooltip">
                        <span className="quality-metric">OSS License</span>
                        <span className="tooltiptext">
                            <span className="title">OSS License</span>
                            <span className="definition">
                                OSS License refers to the open-source software license and permission to distribute software or source code. It consists of one quality metric element:
                                <ul>
                                    <li>
                                        License Type refers to different types of open-source licenses that define how the open source can be used, modified, and shared.
                                        Check <a target="_blank" rel="noreferrer" href="https://choosealicense.com/appendix/"><code> license type </code></a>
                                    </li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V1 = M/5 * 100</div>
                                <div className="row">
                                    <span>V1</span>
                                    <span>OSS License</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>License Type</span>
                                </div>
                                <div className="row">
                                    <span>M=1</span>
                                    <span>Undefined/Unclear</span>
                                </div>
                                <div className="row">
                                    <span>M=2</span>
                                    <span>LGPL-2.1, GPL-2.0</span>
                                </div>
                                <div className="row">
                                    <span>M=3</span>
                                    <span>AGPL-3.0, EPL-2.0, GPL-3.0, MPL-2.0</span>
                                </div>
                                <div className="row">
                                    <span>M=4</span>
                                    <span>BSD-2-Clause, BSD-3-Clause, BSL-1.0, CC0-1.0, The Unlicense</span>
                                </div>
                                <div className="row">
                                    <span>M=5</span>
                                    <span>Apache 2.0, MIT</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: License Type</p>
                                <p>Right: Quality metric score</p>
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
                    <span className="sub-factor">Community Size</span>
                    <div className="tooltip">
                        <span className="quality-metric">Size of Community</span>
                        <span className="tooltiptext">
                            <span className="title">Size of Community</span>
                            <span className="definition">
                                Size of Community refers to the number of members in the open-source community. It consists of one quality metric element:
                                <ul>
                                    <li>
                                        Number of Core Team Members, Contributors, and Watchers where
                                        <ul style={{"list-style-type": "circle"}}>
                                            <li>
                                                Number of Core Team Members refers to the number of core members of the open-source project, including owners and dedicated members, who determine the direction and evolution of the project.
                                            </li>
                                            <li>
                                                Number of Contributors refers to the number of open-source project members who have contributed to the commit history of the project.
                                            </li>
                                            <li>
                                                Number of Watchers refers to the number of open-source project members who have will be notified of activity in the project, but have not contributed to the project.
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                           
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V2 = M/5 * 100</div>
                                <div className="row">
                                    <span>V2</span>
                                    <span>Size of Community</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Number of Core Team Members, Contributors, and Watchers</span>
                                </div>
                                <div className="row">
                                    <span>M=1</span>
                                    <span>Small (&lt; 50 people)</span>
                                </div> 
                                <div className="row">
                                    <span>M=2</span>
                                    <span>Relatively Small (50 - 115 people)</span>
                                </div>
                                <div className="row">
                                    <span>M=3</span>
                                    <span>Medium (116 - 183 people)</span>
                                </div>
                                <div className="row">
                                    <span>M=4</span>
                                    <span>Relatively Large (184 - 249 people)</span>
                                </div>
                                <div className="row">
                                    <span>M=5</span>
                                    <span>Large (&ge; 250 people)</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Total number of people</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <span className="sub-factor">Availability of Forum</span>
                    <div className="tooltip">
                        <span className="quality-metric">Q&A Volume</span>
                        <span className="tooltiptext">
                            <span className="title">Q&A Volume</span>
                            <span className="definition">
                                Q&A Volume refers to the number of questions and answers in the discussion forum of the open-source software which indicates the activeness of the forum.  It consists of one quality metric element:
                                <ul>
                                    <li>Average Q&A refers to an average number of questions and answers in the forum per month in the past 6 months.</li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V3 = M/5 * 100</div>
                                <div className="row">
                                    <span>V3</span>
                                    <span>Q&A Volume</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Average Q&A Per Month in the Past 6 Months</span>
                                </div>  
                                <div className="row">
                                    <span>M=1</span>
                                    <span>Average Q&A in the past 6 months &#x2264; 30 messages per month</span>
                                </div>
                                <div className="row">
                                    <span>M=2</span>
                                    <span>Average Q&A in the past 6 months &gt; 30-150 messages per month</span>
                                </div>
                                <div className="row">
                                    <span>M=3</span>
                                    <span>Average Q&A in the past 6 months &gt; 150-300 </span>
                                </div>
                                <div className="row">
                                    <span>M=4</span>
                                    <span>Average Q&A in the past 6 months &gt; 300-720 </span>
                                </div>
                                <div className="row">
                                    <span>M=5</span>
                                    <span>Average Q&A in the past 6 months &gt; 720 messages per month</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Number of question with answers/Total questions</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <span className="sub-factor">Support Contributors</span>
                    <div className="tooltip">
                        <span className="quality-metric">Number of Support Contributors</span>
                        <span className="tooltiptext">
                            <span className="title">Number of Support Contributors</span>
                            <span className="definition">
                            Number of Support Contributors refers to the number of open-source project members who provide support for the use of software. It consists of two quality metric elements:
                            <ul>
                                <li>
                                    Number of Contributors refers to the number of open-source project members who have contributed to the commit history of the project.
                                </li>
                                <li>
                                    Number of Core Team Members refers to the number of core members of the open-source project, including owners and dedicated members, who determine the direction and evolution of the project.
                                </li>
                            </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V4 = M/5 * 100</div>
                                <div className="row">
                                    <span>V4</span>
                                    <span>Number of Support Contributors</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Number of Contributors and Core Team Members</span>
                                </div>
                                <div className="row">
                                    <span>M=1</span>
                                    <span>Total &lt;  5 persons</span>
                                </div>
                                <div className="row">
                                    <span>M=2</span>
                                    <span>Total 5-10 persons</span>
                                </div>
                                <div className="row">
                                    <span>M=3</span>
                                    <span>Total 10-20 persons</span>
                                </div>
                                <div className="row">
                                    <span>M=4</span>
                                    <span>Total 20-50 persons</span>
                                </div>
                                <div className="row">
                                    <span>M=5</span>
                                    <span>Total &gt; 50 persons</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Number of core developers and contributors</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <span className="sub-factor">Quality of Professional Support</span>
                    <div className="tooltip">
                        <span className="quality-metric">Support Activity</span>
                        <span className="tooltiptext">
                            <span className="title">Support Activity</span>
                            <span className="definition">
                                Support Activity refers to the degree of support activity for issues and pull requests. It consists of two quality metric elements:
                                <ul>
                                    <li>
                                        Issue Support Activity is the proportion of issues that have been responded in the past 6 months. If there are no reported issues, there will be no evidence to show whether the support is active recently. 
                                    </li>
                                    <li>
                                        Pull Request Support Activity is the proportion of pull requests that have been responded in the past 6 months. If there are no pull requests, there will be no evidence to show whether the support is active recently.  
                                    </li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V5 = ((M1+M2)/2) * 100</div>
                                <div className="row">
                                    <span>V5</span>
                                    <span>Support Rate</span>
                                </div>
                                <div className="row">
                                    <span>M1</span>
                                    <span>Issue Support Rate</span>
                                </div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Pull Request Support Rate</span>
                                </div>

                                <div className="equation mt-10">M1 = (Issues/N)</div>
                                <div className="row">
                                    <span>M1</span>
                                    <span>Issue Support Rate</span>
                                </div>
                                <div className="row">
                                    <span>N</span>
                                    <span>Total issues in the past 6 months</span>
                                </div>

                                <div className="equation mt-10">M2 = (Pull Requests/N)</div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Pull Request Support Rate</span>
                                </div>
                                <div className="row">
                                    <span>N</span>
                                    <span>Total pull requests in the past 6 months</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Issue support rate/Pull request support rate</p>
                                <p>Right: Quality metric score</p>
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
                    <span className="sub-factor">Maturity</span>
                    <div className="tooltip">
                        <span className="quality-metric">Maturity Level</span>
                        <span className="tooltiptext">
                            <span className="title">Maturity Level</span>
                            <span className="definition">
                                The degree to which the open-source software meets the needs for reliability under normal operation. It consists of two quality metric elements:
                                <ul>
                                    <li>Age is age of project repository from created date to last update.</li>
                                    <li>Issueless Code refers to a characteristic of the code with small number of issues in the past 6 months which indicates that the open-source software is likely to be mature and work correctly under normal operation.</li>
                                    <li>Minor Releases refers to the number of minor releases in the past 12 months which typically indicates the project has planned updates and bug fixes.</li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V6 = ((M1+M2+M3)/3) * 100</div>
                                <div className="row">
                                    <span>V6</span>
                                    <span>Maturity Level</span>
                                </div>
                                <div className="row">
                                    <span>M1</span>
                                    <span>Age</span>
                                </div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Issueless Code</span>
                                </div>
                                <div className="row">
                                    <span>M3</span>
                                    <span>Minor Releases</span>
                                </div>

                                <div className="equation mt-10">M1 = S age / 5</div>
                                <div className="row">
                                    <span>M1</span>
                                    <span>Project Age</span>
                                </div>
                                <div className="row">
                                    <span>S age = 1</span>
                                    <span>Age &lt; 2 months </span>
                                </div>
                                <div className="row">
                                    <span>S age = 2</span>
                                    <span>Age 2-12 months </span>
                                </div>
                                <div className="row">
                                    <span>S age = 3</span>
                                    <span>Age 1-2 years </span>
                                </div>
                                <div className="row">
                                    <span>S age = 4</span>
                                    <span>Age 2-3 years </span>
                                </div>
                                <div className="row">
                                    <span>S age = 5</span>
                                    <span>Age &gt; 3 years </span>
                                </div>

                                <div className="equation mt-10">M2 = S issue /5</div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Issueless Code</span>
                                </div>
                                <div className="row">
                                    <span>S issue = 1</span>
                                    <span>Number of issues in the past 6 months &gt; 1000 bugs</span>
                                </div>
                                <div className="row">
                                    <span>S issue = 2</span>
                                    <span>Number of issues in the past 6 months 500-1000 bugs</span>
                                </div>
                                <div className="row">
                                    <span>S issue = 3</span>
                                    <span>Number of issues in the past 6 months 100-500 bugs</span>
                                </div>
                                <div className="row">
                                    <span>S issue = 4</span>
                                    <span>Number of issues in the past 6 months 50-100 bugs</span>
                                </div>
                                <div className="row">
                                    <span>S issue = 5</span>
                                    <span>Number of issues in the past 6 months &#x2264; 50 bugs</span>
                                </div>

                                <div className="equation mt-10">M3 = S release / 5</div>
                                <div className="row">
                                    <span>M3</span>
                                    <span>Minor Releases</span>
                                </div>
                                <div className="row">
                                    <span>S release = 1</span>
                                    <span>Number of minor releases in the past 12 months  0 versions</span>
                                </div>
                                <div className="row">
                                    <span>S release = 3</span>
                                    <span>Number of minor releases in the past 12 months  1 - 3 versions</span>
                                </div>
                                <div className="row">
                                    <span>S release = 5</span>
                                    <span>Number of minor releases in the past 12 months  &gt; 3 versions</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Age/Total issue/Total Releases</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <span className="sub-factor">Development Language</span>
                    <div className="tooltip">
                        <span className="quality-metric">Development Language Popularity</span>
                        <span className="tooltiptext">
                            <span className="title">Development Language Popularity</span>
                            <span className="definition">
                                Development Language Popularity refers to the popularity of programming, scripting, and markup languages, and the use of popular development languages makes it easier to manage project operation and maintenance.
                                Check <a target="_blank" href="https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages"> Computer Language Ranking Survey. </a>
                                It consists of one quality metric element:
                                <ul>
                                    <li>Computer Language refers to how commonly the languages are used by professional developers.</li>
                                </ul> 
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V7 = M/5 * 100</div>
                                <div className="row">
                                    <span>V7</span>
                                    <span>Development Language Popularity</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Computer Language</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>Julia, COBOL, Pascal, Fortran</span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>Rust, Objective-C, Dart, Scala, Perl, Haskell</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>Kotlin, Ruby, Assembly, VBA, Swift, R</span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>C#, PHP, TypeScript, C++, C, Go</span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>JavaScript, HTML/CSS, SQL, Python, Java, Bash/Shell/PowerShell</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Primary computer language</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <span className="sub-factor">Documentation</span>
                    <div className="tooltip">
                        <span className="quality-metric">Code Documentation</span>
                        <span className="tooltiptext">
                            <span className="title">Code Documentation</span>
                            <span className="definition">
                                Code Documentation refers to the degree to which the code documentation is made available for effective use of the open-source software. It consists of two quality metric elements:
                                <ul>
                                    <li>
                                        Code Comments refers to the amount of code comments, compared with the total amount of code. Some of the comments may be used to generate API documents.                                 
                                        Check <a target="_blank" href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/"><code>density</code></a>
                                    </li>
                                    <li>
                                        Markdown Files refers to the proportion of markdown files in the project.                                 
                                    </li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V8 = (M1+M2/2) * 100</div>
                                <div className="row">
                                    <span>V8</span>
                                    <span>Code Documentation</span>
                                </div>
                                <div className="row">
                                    <span>M1</span>
                                    <span>Code Comments</span>
                                </div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Markdown Files</span>
                                </div>

                                <div className="equation mt-10">M1 = Comment Lines/(Code Lines + Comment Lines)</div>
                                <div className="row">
                                    <span>M1</span>
                                    <span>Code Comments</span>
                                </div>
                                <div className="row">
                                    <span>Comment Lines</span>
                                    <span>Number of comment lines</span>
                                </div>
                                <div className="row">
                                    <span>Code Lines</span>
                                    <span>Number of lines of code</span>
                                </div>

                                <div className="equation mt-10">M2 = Markdown files/Total files</div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Markdown Files</span>
                                </div>
                                <div className="row">
                                    <span>Markdown files</span>
                                    <span>Number of markdown files in the project repository.</span>
                                </div>
                                <div className="row">
                                    <span>Total files</span>
                                    <span>Total files in the project repository.</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Comment lines rate/Markdown files rate</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <span className="sub-factor">Books/Online</span>
                    <div className="tooltip">
                        <span className="quality-metric">Learning Materials</span>
                        <span className="tooltiptext">
                            <span className="title">Learning Material</span>
                            <span className="definition">
                                Learning Materials refers to the number of published learning materials for the open-source software. If there are none of these materials, learning about the software will have to rely on the published source code and code documentation. It consists of two quality metric elements:
                                <ul>
                                    <li>
                                        Books refers to the number of book titles about the software.                                 
                                    </li>
                                    <li>
                                        Courses refers to the number of videos about the software.                                
                                    </li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V9 = (M/5) * 100</div>
                                <div className="row">
                                    <span>V9</span>
                                    <span>Learning Materials</span>
                                </div>

                                <div className="row">
                                    <span>M</span>
                                    <span>Books and Courses</span>
                                </div>
                                <div className="row">
                                    <span>M1</span>
                                    <span>None</span>
                                </div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>1-3 materials</span>
                                </div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>&gt; 3-6 materials</span>
                                </div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>&gt; 6-15 materials</span>
                                </div>  <div className="row">
                                    <span>M5</span>
                                    <span>&gt; 15 materials</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Total books/online</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="item-box">
                <div className='item-list'>
                    <span className='bold'>Economics</span>
                </div>
                <div className='item-list'>
                    <span className="sub-factor">Cost</span>
                    <div className="tooltip">
                        <span className="quality-metric">Cost of Ownership Reduction</span>
                        <span className="tooltiptext">
                            <span className="title">Cost of Ownership Reduction</span>
                            <span className="definition">
                                Cost of Ownership Reduction refers to the degree to which the cost of owning a piece of software is reduced when the software is open source. It consists of three quality metric elements:
                                <ul>
                                    <li>Maintainability Level (V15) refers to the degree of ease with which the open-source software can be maintained and is defined in terms of the Technical Debt Ratio of the software, i.e. the ratio between the cost to fix all code smells in the software and the cost to develop the software. When maintainability is high, maintenance costs can be reduced.</li>
                                    <li>Support Activity (V5) refers to the degree of support activity for issues and pull requests in the past 6 months. If there are no reported issues and pull requests, there will be no evidence to show whether the support is active recently. With active support from the contributors and core team members, development costs and maintenance costs can be reduced.</li>
                                    <li>Learning Materials (V9) refers to the number of published learning materials for the open-source software, i.e. books and courses. If there are none of these materials, learning about the software will have to rely on the published source code and code documentation. The materials can reduce training costs.</li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V10 = ((M1+M2+M3)/3) * 100</div>
                                <div className="row">
                                    <span>V10</span>
                                    <span>Cost of Ownership Reduction</span>
                                </div>

                                <div className="row">
                                    <span>M1</span>
                                    <span>Maintainability Level (Ref. Maintainability)</span>
                                </div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Support Activity (Ref. Quality of Professional Support)</span>
                                </div>
                                <div className="row">
                                    <span>M3</span>
                                    <span>Learning Materials (Ref. Books/Online)</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Maintainability Level/Support Activity/Learning Materials</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <span className="sub-factor">Innovativeness</span>
                    <div className="tooltip">
                        <span className="quality-metric">New Features Focus</span>
                        <span className="tooltiptext">
                            <span className="title">New Features Focus</span>
                            <span className="definition">
                                New Features Focus New Features refers to the degree to which the change as new feature enhancement has been introduced to the open-source software in relation to the effort to effect change to the open source. This indicates the degree of the contributors' focus on innovativeness of the open source.  The focus on enhancing the open source with new features helps keep the software that utilizes the open source upgraded and modernized, making it beneficial for economic reasons. The metric consists of one quality metric element:
                                <ul>
                                    <li>New Feature Pull Requests refers to the proportion of pull requests labeled with new features in the past 6 months.</li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V11 = M * 100</div>
                                <div className="row">
                                    <span>V11</span>
                                    <span>New Features Focus</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>New Feature Pull Requests</span>
                                </div>

                                <div className="equation">M = New feature PRs/N</div>
                                <div className="row">
                                    <span>M</span>
                                    <span>New Feature Pull Requests</span>
                                </div>
                                <div className="row">
                                    <span>New feature PRs</span>
                                    <span>Number of new feature pull requests in the past 6 months</span>
                                </div>
                                <div className="row">
                                    <span>N</span>
                                    <span>Total pull requests in the past 6 months</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Total new feature pull request / Total pull request</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <span className="sub-factor">Competitiveness</span>
                    <div className="tooltip">
                        <span className="quality-metric">Continuing Change</span>
                        <span className="tooltiptext">
                            <span className="title">Continuing Change</span>
                            <span className="definition">
                                Continuing Change refers to the degree to which the change to correct, improve, and enhance has been introduced to the open-source software. For the open source to stay competitive with other open source of a similar kind, such change needs to be incorporated regularly and in a timely manner, or else the open source becomes less satisfactory. Such change also helps with keeping the software that utilizes the open source upgraded, modernized, and competitive, making it beneficial for economic reasons. The metric consists of one quality metric element:
                                <ul>
                                    <li>
                                        Pull Request Frequency refers to the frequency of pull requests that have proposed change to the project in the past 30 days.
                                    </li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V12 = M * 100</div>
                                <div className="row">
                                    <span>V12</span>
                                    <span>Pull Requests</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Pull Request Frequency</span>
                                </div>

                                <div className="equation">M = P / 30</div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Pull Request Frequency</span>
                                </div>
                                <div className="row">
                                    <span>P</span>
                                    <span>Number of days in the past 30 days that pull requests have been created.</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Total Pull Request Frequency / 30 days</p>
                                <p>Right: Quality metric score</p>
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
                    <span className="sub-factor">Code Quality</span>
                    <div className="tooltip">
                        <span className="quality-metric">Code Quality Level</span>
                        <span className="tooltiptext">
                            <span className="title">Code Quality Level</span>
                            <span className="definition">
                                The degree to which the code of the open-source software exhibits good quality for long-term maintenance and evolution. It consists of two quality metric elements:
                                <ul>
                                    <li>Uncomplex Code refers to a characteristic of the code with less degree of cyclomatic complexity which indicates that the code has better quality.</li>
                                    <li>Unduplicated Code refers to a characteristic of the code with less degree of duplications which indicates that the code has better quality.</li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V13 = ((M1+M2)/2) * 100</div>
                                <div className="row">
                                    <span>V13</span>
                                    <span>Code Quality Level</span>
                                </div>
                                <div className="row">
                                    <span>M1</span>
                                    <span>Uncomplex Code</span>
                                </div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Unduplicated Code</span>
                                </div>

                                <div className="equation mt-10">M1 = S/4</div>
                                <div className="row">
                                    <span>M1</span>
                                    <span>Uncomplex Code (Avg. Cyclomatic Complexity)</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>Cyclomatic Complexity &gt; 50</span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>Cyclomatic Complexity between 21 – 50</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>Cyclomatic Complexity between 11 – 20</span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>Cyclomatic Complexity between 1 – 10</span>
                                </div>

                                <div className="equation mt-10">M2 = 1 - (Duplication Lines/Code Lines)</div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Uncomplex Code</span>
                                </div>
                                <div className="row">
                                    <span>Duplication Lines</span>
                                    <span>Number of lines involved in duplications</span>
                                </div>
                                <div className="row">
                                    <span>Code Lines</span>
                                    <span>Number of lines of code</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Uncomplex Code rate/Unduplicated Code rate</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <span className="sub-factor">Reliability</span>
                    <div className="tooltip">
                        <span className="quality-metric">Reliability Level</span>
                        <span className="tooltiptext">
                            <span className="title">Reliability Level</span>
                            <span className="definition">
                                Reliability Level refers to the degree to which the open-source software works well as expected without bugs, or any present bugs are not severe.
                                Check <a target="_blank" href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-6"><code> reliability_rating </code></a>
                                It consists of one quality metric element:
                                <ul>
                                    <li>
                                        Reliability Rating refers to the degree of quality of the code that is bug-free or has less severe bugs
                                    </li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V14 = M/5 * 100</div>
                                <div className="row">
                                    <span>V14</span>
                                    <span>Reliability Level</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Reliability Rating</span>
                                </div>
                                <div className="row">
                                    <span>M=1</span>
                                    <span>E - at least 1 Blocker Bug</span>
                                </div>
                                <div className="row">
                                    <span>M=2</span>
                                    <span>D - at least 1 Critical Bug</span>
                                </div>
                                <div className="row">
                                    <span>M=3</span>
                                    <span>C - at least 1 Major Bug</span>
                                </div>
                                <div className="row">
                                    <span>M=4</span>
                                    <span>B - at least 1 Minor Bug</span>
                                </div>
                                <div className="row">
                                    <span>M=5</span>
                                    <span>A - 0 Bug</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Reliability Rating</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <span className="sub-factor">Maintainability</span>
                    <div className="tooltip">
                        <span className="quality-metric">Maintainability Level</span>
                        <span className="tooltiptext">
                            <span className="title">Maintainability Level</span>
                            <span className="definition">
                                (Formerly the SQALE rating) Maintainability Level refers to the degree of ease with which the open-source software can be maintained and is defined in terms of the Technical Debt Ratio of the software, i.e. the ratio between the cost to fix all code smells in the software and the cost to develop the software. 
                                Check <a target="_blank" href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-4"><code> sqale_rating </code></a>
                                The metric consists of one quality metric element:
                                <ul>
                                    <li>
                                        Maintainability Rating refers to the degree of quality of the code having less technical debt ratio. 
                                    </li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V15 = M/5 * 100</div>
                                <div className="row">
                                    <span>V15</span>
                                    <span>Maintainability Level</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Maintainability Rating</span>
                                </div>
                                <div className="row">
                                    <span>M=1</span>
                                    <span>E – Technical debt ratio &gt; 50%</span>
                                </div>
                                <div className="row">
                                    <span>M=2</span>
                                    <span>D – Technical debt ratio between 21 to 50% </span>
                                </div>
                                <div className="row">
                                    <span>M=3</span>
                                    <span>C – Technical debt ratio between 11 to 20%</span>
                                </div>
                                <div className="row">
                                    <span>M=4</span>
                                    <span>B – Technical debt ratio between 6 to 10%</span>
                                </div>
                                <div className="row">
                                    <span>M=5</span>
                                    <span>A – Technical debt ratio &#8804; 5%</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Maintainability Rating</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <span className="sub-factor">Security </span>
                    <div className="tooltip">
                        <span className="quality-metric">Security Level</span>
                        <span className="tooltiptext">
                            <span className="title">Security Level</span>
                            <span className="definition">
                            Security Level refers to the degree of security of the open-source software in terms of security vulnerabilities that are present in the code and how severe they are. 
                                Check <a target="_blank" href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-7"><code> security_rating </code></a>
                                It consists of one quality metric element:
                                <ul>
                                    <li>
                                        Security Rating refers to the degree of quality of the code that is vulnerability-free or has less severe vulnerabilities.
                                    </li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V16 = M/5 * 100</div>
                                <div className="row">
                                    <span>V16</span>
                                    <span>Security Level</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Security Rating</span>
                                </div>
                                <div className="row">
                                    <span>M=1</span>
                                    <span>E – at least 1 blocker vulnerability</span>
                                </div>
                                <div className="row">
                                    <span>M=2</span>
                                    <span>D – at least 1 critical vulnerability</span>
                                </div>
                                <div className="row">
                                    <span>M=3</span>
                                    <span>C – at least 1 major vulnerability</span>
                                </div>
                                <div className="row">
                                    <span>M=4</span>
                                    <span>B – at least 1 minor vulnerability</span>
                                </div>
                                <div className="row">
                                    <span>M=5</span>
                                    <span>A – no vulnerabilities</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Security rating level</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <span className="sub-factor">Testability</span>
                    <div className="tooltip">
                        <span className="quality-metric">Testability Level</span>
                        <span className="tooltiptext">
                            <span className="title">Testability Level</span>
                            <span className="definition">
                                Testability Level refers to the degree of ease with which the open-source software can be tested. It consists of one quality metric element:
                                <ul>
                                    <li>Uncomplex Code refers to a characteristic of the code with less degree of cyclomatic complexity which indicates that there is a smaller number of paths through the code, making it less complex to test.</li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V17 = M/4 * 100</div>
                                <div className="row">
                                    <span>V17</span>
                                    <span>Testability Level</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Uncomplex Code (Avg. Cyclomatic Complexity)</span>
                                </div>
                                <div className="row">
                                    <span>M=1</span>
                                    <span>Cyclomatic Complexity &gt; 50</span>
                                </div>
                                <div className="row">
                                    <span>M=2</span>
                                    <span>Cyclomatic Complexity between 21 – 50</span>
                                </div>
                                <div className="row">
                                    <span>M=3</span>
                                    <span>Cyclomatic Complexity between 11 – 20</span>
                                </div>
                                <div className="row">
                                    <span>M=4</span>
                                    <span>Cyclomatic Complexity between 1 – 10</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Avg. Cyclomatic Complexity</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <span className="sub-factor">Compatibility</span>
                    <div className="tooltip">
                        <span className="quality-metric">Co-existence</span>
                        <span className="tooltiptext">
                            <span className="title">Co-existence</span>
                            <span className="definition">
                                Co-existence refers to the degree to which the open-source software can co-exist or work with other software in various development environment, and is dependent on the various development environment that the programming language of the project is used for. It consists of one quality metric element:
                                <ul>
                                    <li>Development Environment refers to the four types of development environment, i.e. web, mobile, desktop, or embedded development environment, which the primary programming language of the project can support.</li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V18 = M/4 * 100</div>
                                <div className="row">
                                    <span>V18</span>
                                    <span>Co-existence</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Development Environment i.e. web, mobile, desktop, embedded</span>
                                </div>
                                <div className="row">
                                    <span>M=1</span>
                                    <span>1 Supported Development Environment Type</span>
                                </div>
                                <div className="row">
                                    <span>M=2</span>
                                    <span>2 Supported Development Environment Types </span>
                                </div>
                                <div className="row">
                                    <span>M=3</span>
                                    <span>3 Supported Development Environment Types </span>
                                </div>
                                <div className="row">
                                    <span>M=4</span>
                                    <span>4 Supported Development Environment Types</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Total platform supported</p>
                                <p>Right: Quality metric score</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <span className="sub-factor">Performance</span>
                    <div className="tooltip">
                        <span className="quality-metric">Lack of Performance Issues Level</span>
                        <span className="tooltiptext">
                            <span className="title">Lack of Performance Issues Level</span>
                            <span className="definition">
                                Lack of Performance Issues Level refers to the degree to which the open-source software works without performance issues. It consists of one quality metric element:
                                <ul>
                                    <li>Lack of Performance Issues refers to the proportion of non-performance issues in relation to other reported issues in the past 6 months. </li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V19 = M * 100</div>
                                <div className="row">
                                    <span>V19</span>
                                    <span>Lack of Performance Issues Level</span>
                                </div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Lack of Performance Issues</span>
                                </div>

                                <div className="equation">M = 1 - (perf issues / N)</div>
                                <div className="row">
                                    <span>M</span>
                                    <span>Lack of Performance Issues</span>
                                </div>
                                <div className="row">
                                    <span>perf issues</span>
                                    <span>Number of performance issues@in the past 6 months</span>
                                </div>
                                <div className="row">
                                    <span>N</span>
                                    <span>Total opened issues in the past 6 months</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Total performance issues / Total issues</p>
                                <p>Right: Quality metric score</p>
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
                    <span>Quality Score</span>
                </div>
            </div>
        </div>
    )
}