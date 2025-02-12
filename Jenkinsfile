pipeline {
    agent { label 'dev' }  

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        DOCKER_IMAGE = 'priyansh21/puzzle:latest'
        NAMESPACE = 'enigmus-namespace'
        DOCKER_CONTAINER = 'puzzle-container'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Priyanshvaishnav/Enigmus.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-scanner') {
                    sh '''
                        $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectName=Enigmus \
                        -Dsonar.projectKey=Enigmus
                    '''
                }
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'OWASP DP-Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }

        stage('Trivy Scan (File System)') {
            steps {
                script {
                    def exitCode = sh(script: "trivy fs . > trivyfs.txt; echo \$?", returnStatus: true)
                    if (exitCode != 0) {
                        timeout(time: 2, unit: 'MINUTES') {  
                            try {
                                input(message: "Trivy FS scan detected vulnerabilities. Do you want to proceed?", ok: "Proceed")
                            } catch (Exception e) {
                                echo "No response within 2 minutes, proceeding automatically..."
                            }
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Trivy Scan (Docker Image)') {
            steps {
                script {
                    def exitCode = sh(script: "trivy image ${DOCKER_IMAGE} > trivyimage.txt; echo \$?", returnStatus: true)
                    if (exitCode != 0) {
                        timeout(time: 2, unit: 'MINUTES') {  
                            try {
                                input(message: "Trivy Image scan detected vulnerabilities. Do you want to proceed?", ok: "Proceed")
                            } catch (Exception e) {
                                echo "No response within 2 minutes, proceeding automatically..."
                            }
                        }
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'dockerhub-cred', toolName: 'docker') {   
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }

        stage('Run Container on Slave') {
            steps {
                sh "docker stop ${DOCKER_CONTAINER} || true"
                sh "docker rm ${DOCKER_CONTAINER} || true"
                sh "docker run -d --name ${DOCKER_CONTAINER} -p 5173:5173 ${DOCKER_IMAGE}"
            }
        }

        stage('Create Kubernetes Namespace') {
            steps {
                sh "kubectl create namespace ${NAMESPACE} || echo 'Namespace already exists'"
            }
        }

        stage('Deploy Application to Kubernetes') {
            steps {
                sh "kubectl apply -f K8s-manifest/ -n ${NAMESPACE}"
            }
        }

        stage('Expose Application') {
            steps {
                script {
                    def serviceUrl = sh(script: "minikube service puzzle-service -n ${NAMESPACE} --url", returnStdout: true).trim()
                    echo "Application is running at: ${serviceUrl}"
                    
                    sh "kubectl port-forward svc/puzzle-service 5555:80 --address 0.0.0.0 -n ${NAMESPACE} &"
                }
            }
        }
    }
}
