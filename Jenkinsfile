pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub-creds'
        DOCKERHUB_USERNAME       = 'kiran700'
        IMAGE_NAME               = 'nodejs-login-app'
    }
    
    stages {
        
        stage ("Clone") {
            steps {
                echo "Cloning the code"
                git url: 'https://github.com/kiranrajeev1/nodejs-docker-app.git', branch: 'main'
                echo "Cloning successful"
            }
        }

        stage ("Build") {
            steps {
                echo "Building the Docker image"
                sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}latest ."
                echo "Build successful"
            }
        }
        
        stage('Docker Login') {
            steps {
                echo "Logging in"
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds', 
                    usernameVariable: 'DOCKER_USER', 
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                echo "Pushing image to dockerhub"
                sh 'docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest'
                echo "Push successful"
            }
        }

        stage ("Deploy") {
            steps {
                echo "Deploying the application"
                sh "docker-compose up -d"
            }
        }

    }
}
