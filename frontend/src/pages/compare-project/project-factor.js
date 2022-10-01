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
                                Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-8">ncloc</a>
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
                                Open-source software license and permission to distribute software or source code.
                                Check <a className="ml-5" href="https://choosealicense.com/appendix" target="_blank">License Type Reference</a>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V1 = S/5 * 100</div>
                                <div className="row">
                                    <span>V1</span>
                                    <span>OSS License</span>
                                </div>
                                <div className="row">
                                    <span>S</span>
                                    <span>License Type</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>Undefined/Unclear</span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>LGPL-2.1, GPL-2.0</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>AGPL-3.0, EPL-2.0, GPL-3.0, MPL-2.0</span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>BSD-2-Clause, BSD-3-Clause, BSL-1.0, CC0-1.0, The Unlicense</span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>Apache 2.0, MIT</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: License Type</p>
                                <p>Right: Quality metric score 0-100</p>
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
                                Number of Core team, contributors and watchers of the project.
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V2 = S/5 * 100</div>
                                <div className="row">
                                    <span>V2</span>
                                    <span>Size of Community</span>
                                </div>
                                <div className="row">
                                    <span>S</span>
                                    <span>Number of Core Team Members, Contributors, and Watchers</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>Small (Total &lt; 50 people)</span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>Relatively Small (Total 50 to 100 people)</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>Medium (Total 100 to 200 people)</span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>Relatively Large (Total 200 to 300 people)</span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>Large (Total &gt; 300 people)</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Total number of people</p>
                                <p>Right: Quality metric score 0-100</p>
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
                            Average number of questions and answers in the forum per month in the past 6 months.
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V3 = S/5 * 100</div>
                                <div className="row">
                                    <span>V3</span>
                                    <span>Q&A Volume</span>
                                </div>
                                <div className="row">
                                    <span>S</span>
                                    <span>Average Q&A Per Month in the Past 6 Months</span>
                                </div>  
                                <div className="row">
                                    <span>S=1</span>
                                    <span>Average Q&A in the past 6 months &#x2264; 30 messages per month</span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>Average Q&A in the past 6 months &gt; 30-150 messages per month</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>Average Q&A in the past 6 months &gt; 150-300 </span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>Average Q&A in the past 6 months &gt; 300-720 </span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>Average Q&A in the past 6 months &gt; 720 messages per month</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Number of question with answers</p>
                                <p>Right: Quality metric score 0-100</p>
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
                                Number of contributors and core team members.
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V4 = S/5 * 100</div>
                                <div className="row">
                                    <span>V4</span>
                                    <span>Number of Support Contributors</span>
                                </div>
                                <div className="row">
                                    <span>S</span>
                                    <span>Number of Contributors and Core Team Members</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>Total &lt;  5 persons</span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>Total 5-10 persons</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>Total 10-20 persons</span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>Total 20-50 persons</span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>Total &gt; 50 persons</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Number of core developers and contributors</p>
                                <p>Right: Quality metric score 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <span className="sub-factor">Quality of Professional Support</span>
                    <div className="tooltip">
                        <span className="quality-metric">Support Rate</span>
                        <span className="tooltiptext">
                            <span className="title">Support Rate</span>
                            <span className="definition">
                                Support Rate refers to quality of supports in issues and pull requests. It consists of two quality metric elements:
                                <ul>
                                    <li>
                                        Issue Support Rate is the rate of issues that have been responded in the past 6 months. 
                                        If there are no reported issues, there will be no evidence to show whether the support is active recently. 
                                    </li>
                                    <li>
                                        Pull Request Support Rate is the rate of pull requests that have been responded in the past 6 months. If there are no pull requests, 
                                        there will be no evidence to show whether the support is active recently. 
                                    </li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V5 = ((M1+M2)/2)</div>
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
                                    <span>Pull Request Support</span>
                                </div>

                                <div className="equation mt-10">M1 = (Issues/N) * 100</div>
                                <div className="row">
                                    <span>M1</span>
                                    <span>Issue Support Rate</span>
                                </div>
                                <div className="row">
                                    <span>N</span>
                                    <span>Total issues in the past 6 months</span>
                                </div>

                                <div className="equation mt-10">M2 = (Pull Requests/N) * 100</div>
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
                                <p>Right: Quality metric score 0-100</p>
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

                                <div className="equation mt-10">M1 = S/5</div>
                                <div className="row">
                                    <span>M1</span>
                                    <span>Project Age</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>Age &lt; 2 months </span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>Age 2-12 months </span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>Age 1-2 years </span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>Age 2-3 years </span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>Age &gt; 3 years </span>
                                </div>

                                <div className="equation mt-10">M2 = S/5</div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Issueless Code</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>Number of issues in the past 6 months &gt; 1000 bugs</span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>Number of issues in the past 6 months 500-1000 bugs</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>Number of issues in the past 6 months 100-500 bugs</span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>Number of issues in the past 6 months 50-100 bugs</span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>Number of issues in the past 6 months &#x2264; 50 bugs</span>
                                </div>

                                <div className="equation mt-10">M3 = S/5</div>
                                <div className="row">
                                    <span>M3</span>
                                    <span>Minor Releases</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>Number of minor releases in the past 12 months  0 versions</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>Number of minor releases in the past 12 months  1 - 3 versions</span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>Number of minor releases in the past 12 months  &gt; 3 versions</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Age/Issueless Code/Minor Releases</p>
                                <p>Right: Quality metric score 0-100</p>
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
                                Use of popular development languages which makes it easier to manage project operation and maintenance.
                                Check <a href="https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages" target="_blank">Computer Language Ranking Survey</a>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V7 = S/5 * 100</div>
                                <div className="row">
                                    <span>V7</span>
                                    <span>Development Language Popularity</span>
                                </div>
                                <div className="row">
                                    <span>S</span>
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
                                <p>Right: Quality metric score 0-100</p>
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
                                The degree to which the code documentation, i.e. code comments, is made available for effective use of the open-source software. It consists of one quality metric element:
                                <ul>
                                    <li>
                                        Code Comments refers to the amount of code comments, compared with the total amount of code, which can be later generated as API documents.                                 
                                        Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/" target="_blank">comment_lines_density</a>
                                    </li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V8 = M * 100</div>
                                <div className="row">
                                    <span>V8</span>
                                    <span>Code Documentation</span>
                                </div>

                                <div className="equation mt-10">M = Comment Lines/(Code Lines + Comment Lines)</div>
                                <div className="row">
                                    <span>M</span>
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
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Comment lines/Code lines</p>
                                <p>Right: Quality metric score 0-100</p>
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
                                <div className="equation">V9 = ((M1+M2)/2) * 100</div>
                                <div className="row">
                                    <span>V9</span>
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
                                <p>Left: Uncomplex Code/Unduplicated Code</p>
                                <p>Right: Quality metric score 0-100</p>
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
                                The degree of how well the open-source software works without bugs or blockers.
                                Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-6"><code>reliability_rating</code></a>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V10 = S/5 * 100</div>
                                <div className="row">
                                    <span>V10</span>
                                    <span>Reliability Level</span>
                                </div>
                                <div className="row">
                                    <span>S</span>
                                    <span>Reliability Rating</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>E - at least 1 Blocker Bug</span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>D - at least 1 Critical Bug</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>C - at least 1 Major Bug</span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>B - at least 1 Minor Bug</span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>A - 0 Bug</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Reliability Rating</p>
                                <p>Right: Quality metric score 0-100</p>
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
                                (Formerly the SQALE rating.) The degree of ease with which the open-source software can be maintained, defined in terms of the Technical Debt Ratio of the software, i.e. the ratio between the cost to develop the software and the cost to fix it.
                                Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-4"><code>sqale_rating</code></a>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V11 = S/5 * 100</div>
                                <div className="row">
                                    <span>V11</span>
                                    <span>Maintainability Level</span>
                                </div>
                                <div className="row">
                                    <span>S</span>
                                    <span>Maintainability Rating</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>E – Technical debt ratio &gt; 50%</span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>D – Technical debt ratio between 21 to 50% </span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>C – Technical debt ratio between 11 to 20%</span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>B – Technical debt ratio between 6 to 10%</span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>A – Technical debt ratio &#8804; 5%</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Maintainability Rating</p>
                                <p>Right: Quality metric score 0-100</p>
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
                                The degree of severity of the vulnerability issues in the project.
                                Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-7"><code>security_rating</code></a>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V12 = S/5 * 100</div>
                                <div className="row">
                                    <span>V12</span>
                                    <span>Security Level</span>
                                </div>
                                <div className="row">
                                    <span>S</span>
                                    <span>Security Rating</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>E – at least 1 blocker vulnerability</span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>D – at least 1 critical vulnerability</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>C – at least 1 major vulnerability</span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>B – at least 1 minor vulnerability</span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>A – no vulnerabilities</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Security rating level</p>
                                <p>Right: Quality metric score 0-100</p>
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
                                The degree of ease with which the open-source software can be tested.  It consists of one quality metric element:
                                <ul>
                                    <li>Uncomplex Code refers to a characteristic of the code with less degree of cyclomatic complexity which indicates that there is less number of paths through the code, making it less complex to test. </li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V13 = S/4 * 100</div>
                                <div className="row">
                                    <span>V13</span>
                                    <span>Testability Level</span>
                                </div>
                                <div className="row">
                                    <span>S</span>
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
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Uncomplex Code (Avg. Cyclomatic Complexity)</p>
                                <p>Right: Quality metric score 0-100</p>
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