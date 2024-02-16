pipeline {
    agent any

    tools {nodejs "20.10"}
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Test'){
            steps {
                sh '''
                cd ./FRONT/fodong
                npm install
                npm start
                '''
            }
        }

        // stage('Test') {
        //     steps {
        //         echo 'Testing..'
        //     }
        // }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}