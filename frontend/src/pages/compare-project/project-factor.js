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
                    <span className='bold'>License</span>
                </div>
                <div className='item-list'>
                    <div className="tooltip">
                        <span>License Type</span>
                        <span className="tooltiptext">
                            <span className="title">License Type</span>
                            <span className="definition">
                                Open source software license and permission to distribute software or source code.
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
                                    <span>S=1</span>
                                    <span>Undefined/Unknown</span>
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
                                <p>Right: Metric quality score 0-100</p>
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
                    <div className="tooltip">
                        <span>Community Size</span>
                        <span className="tooltiptext">
                            <span className="title">Community Size</span>
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
                                <p>Right: Metric quality score 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div className="tooltip">
                        <span>Availability of Forum</span>
                        <span className="tooltiptext">
                            <span className="title">Availability of Forum</span>
                            <span className="definition">
                                Average number of questions with answers in forum in the last 6 months.
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V3 = S/5 * 100</div>
                                <div className="row">
                                    <span>V3</span>
                                    <span>Availability of Forum</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>Average Q&A in the last 6 months &#x2264; 30 messages per month</span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>Average Q&A in the last 6 months &gt; 30-150 messages per month</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>Average Q&A in the last 6 months &gt; 150-300 </span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>Average Q&A in the last 6 months &gt; 300-720 </span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>Average Q&A in the last 6 months &gt; 720 messages per month</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Number of question with answers</p>
                                <p>Right: Metric quality score 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div className="tooltip">
                        <span>Support Contributors</span>
                        <span className="tooltiptext">
                            <span className="title">Support Contributors</span>
                            <span className="definition">
                                Number of core developers and contributors.
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V4 = S/5 * 100</div>
                                <div className="row">
                                    <span>V4</span>
                                    <span>Number of Contributors</span>
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
                                <p>Right: Metric quality score 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div className="tooltip">
                        <span>Quality of Professional Support</span>
                        <span className="tooltiptext">
                            <span className="title">Quality of Professional Support</span>
                            <span className="definition">
                                Number of supported issues and supoorted pull requests. If there are no reported issues,
                                it is a sign that information and help has been provided sufficiently for users to efficiently resolve issues that they come across.
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V8 = ((M1+M2)/2)</div>
                                <div className="row">
                                    <span>V8</span>
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
                                    <span>Issue Support</span>
                                </div>
                                <div className="row">
                                    <span>N</span>
                                    <span>Total issues in the last 6 months</span>
                                </div>

                                <div className="equation mt-10">M2 = (Pull Requests/N) * 100</div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Pull Request Support</span>
                                </div>
                                <div className="row">
                                    <span>N</span>
                                    <span>Total pull request in the last 6 months</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Support issue rate/Support pull request rate</p>
                                <p>Right: Metric quality score 0-100</p>
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
                    <div className="tooltip">
                        <span>Maturity</span>
                        <span className="tooltiptext">
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
                                <span className="title">Metric</span>
                                <div className="equation">V5 = ((M1+M2)/2) * 100</div>
                                <div className="row">
                                    <span>V5</span>
                                    <span>Maturity Rating</span>
                                </div>
                                <div className="row">
                                    <span>M1</span>
                                    <span>Age</span>
                                </div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Bugless Code</span>
                                </div>
                                <div className="row">
                                    <span>M3</span>
                                    <span>Release</span>
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
                                    <span>Bugless Code</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>Number of bugs in the last 6 months &gt; 1000 bugs</span>
                                </div>
                                <div className="row">
                                    <span>S=2</span>
                                    <span>Number of bugs in the last 6 months 500-1000 bugs</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>Number of bugs in the last 6 months 100-500 bugs</span>
                                </div>
                                <div className="row">
                                    <span>S=4</span>
                                    <span>Number of bugs in the last 6 months 50-100 bugs</span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>Number of bugs in the last 6 months &#x2264; 50 bugs</span>
                                </div>


                                <div className="equation mt-10">M3 = S/5</div>
                                <div className="row">
                                    <span>M3</span>
                                    <span>Minor Release in the last 12 months</span>
                                </div>
                                <div className="row">
                                    <span>S=1</span>
                                    <span>Number of minor releases 0 versions</span>
                                </div>
                                <div className="row">
                                    <span>S=3</span>
                                    <span>Number of minor releases 1 - 3 versions</span>
                                </div>
                                <div className="row">
                                    <span>S=5</span>
                                    <span>Number of minor releases &gt; 3 versions</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Age in days/Total issues/Total minor release</p>
                                <p>Right: Metric quality score 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <div className="tooltip">
                        <span>Code Documentation</span>
                        <span className="tooltiptext">
                            <span className="title">Code Documentation</span>
                            <span className="definition">
                                The degree to which the code documentation of the open source software is made available for effective use of the open source.
                                Code Comments refers to the amount of code comments that can be later generated as API documents.
                                Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/" target="_blank">comment_lines_density</a>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V7 = (Comment Lines/Comment Lines + Line of code) * 100</div>
                                <div className="row">
                                    <span>V7</span>
                                    <span>Code Comments</span>
                                </div>
                                <div className="row">
                                    <span>Comment Lines</span>
                                    <span>Number of lines containing either comment or commented-out code</span>
                                </div>
                                <div className="row">
                                    <span>Line of code</span>
                                    <span>Number of physical lines that contain at least one character which is neither a whitespace nor a tabulation nor part of a comment</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>

                                <p>Left: Comment lines/Code lines</p>
                                <p>Right: Metric quality score 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>

                <div className='item-list'>
                    <div className="tooltip">
                        <span>Development Language</span>
                        <span className="tooltiptext">
                            <span className="title">Development Language</span>
                            <span className="definition">
                                Use of popular development languages which makes it easier to manage project operation and maintenance.
                                Check <a href="https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages" target="_blank">Language Ranking Survey</a>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V6 = S/5 * 100</div>
                                <div className="row">
                                    <span>V6</span>
                                    <span>Development Language Popularity</span>
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
                                <p>Left: Primary language</p>
                                <p>Right: Metric quality score 0-100</p>
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
                    <div className="tooltip">
                        <span>Security</span>
                        <span className="tooltiptext">
                            <span className="title">Security</span>
                            <span className="definition">
                                Rating that indicates severity of the vulnerability issues in the project.
                                Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-7"><code>security_rating</code></a>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V12 = S/5 * 100</div>
                                <div className="row">
                                    <span>V12</span>
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
                                <p>Right: Metric quality score 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div className="tooltip">
                        <span>Code Quality</span>
                        <span className="tooltiptext">
                            <span className="title">Code Quality</span>
                            <span className="definition">
                                The degree to which the code of the open source software exhibits good quality for long-term maintenance. It consists of two quality metric elements:
                                <ul>
                                    <li>• Uncomplex Code refers to a characteristic of the code with less degree of cyclomatic complexity which indicates that the code has better quality.</li>
                                    <li>• Unduplicated Code refers to a characteristic of the code with less degree of duplications which indicates that the code has better quality.</li>
                                </ul>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V9 = ((M1+M2)/2) * 100</div>
                                <div className="row">
                                    <span>V9</span>
                                    <span>Code Quality Rating</span>
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

                                <div className="equation mt-10">M2 = 1 - (Duplication Lines/Line of Code)</div>
                                <div className="row">
                                    <span>M2</span>
                                    <span>Uncomplex Code</span>
                                </div>
                                <div className="row">
                                    <span>Duplication Lines</span>
                                    <span>Number of lines involved in duplications</span>
                                </div>
                                <div className="row">
                                    <span>Line of Code</span>
                                    <span>Number of minor releases 1 - 3 versions</span>
                                </div>
                            </span>
                            <span className="result">
                                <span className="title">Result</span>
                                <p>Left: Uncomplex code rate/Unduplicated code rate</p>
                                <p>Right: Metric quality score 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div className="tooltip">
                        <span>Testibility</span>
                        <span className="tooltiptext">
                            <span className="title">Testibility</span>
                            <span className="definition">
                                Uncomplex Code refers to a characteristic of the code with less degree of cyclomatic complexity
                                which indicates that there is less number of paths through the code, making it less complex to test.
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V14 = S/4 * 100</div>
                                <div className="row">
                                    <span>V14</span>
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
                                <p>Left: Average cyclomatic complexity</p>
                                <p>Right: Metric quality score 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div className="tooltip">
                        <span>Maintainability</span>
                        <span className="tooltiptext">
                            <span className="title">Maintainability</span>
                            <span className="definition">
                                (Formerly the SQALE rating.) Rating given to the project related to the value of the Technical Debt Ratio.
                                Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-4"><code>sqale_rating</code></a>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V3 = S/5 * 100</div>
                                <div className="row">
                                    <span>V3</span>
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
                                <p>Left: SQALE rating level</p>
                                <p>Right: Metric quality score 0-100</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div className='item-list'>
                    <div className="tooltip">
                        <span>Reliability</span>
                        <span className="tooltiptext">
                            <span className="title">Reliability</span>
                            <span className="definition">
                                The degree of how well open source works without bugs or blockers.
                                Check <a href="https://docs.sonarqube.org/latest/user-guide/metric-definitions/#header-6"><code>reliability_rating</code></a>
                            </span>
                            <span className="metric">
                                <span className="title">Metric</span>
                                <div className="equation">V3 = S/5 * 100</div>
                                <div className="row">
                                    <span>V3</span>
                                    <span>Q&A Voloum</span>
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
                                <p>Left: Reliability rating level</p>
                                <p>Right: Metric quality score 0-100</p>
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