sonar-scanner \
    -Dsonar.host.url=http://18.142.146.135:9000/ \
    -Dsonar.scm.provider=git \
    -Dsonar.sources=. \
    -Dsonar.projectKey=facebook:react \
    -Dsonar.login=admin \
    -Dsonar.password=sonaradmin \
    -X