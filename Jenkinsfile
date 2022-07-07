pipeline {
  environment {
    registry = '81.169.198.21:33345/jenkins/vin-decoder'
    registryCredential = 'harbor-jenkins-credentials'
    dcName = 'vin-decoder'
    dockerImage = ''
    def scannerHome = tool 'sonarqube'
    server = ''
    dcNamespace = 'test'

  }
  agent any

  options {
    gitLabConnection('gitlab')
    gitlabCommitStatus('Jenkins')
    // gitlabStages(enabled: true)
  }

    triggers {
        gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
    }

  stages {
/*
    stage('Sonarqube Analysis') {
      steps {
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
          withSonarQubeEnv('sonarqube') {
            sh "npm install"
            sh "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
    } */

    stage("Docker build") {
      steps {
        script {
          if (env.BRANCH_NAME == 'master') {
            dockerImage = docker.build("${registry}:${env.BUILD_ID}")
            // TODO tag image instead of building twice https://www.jenkins.io/doc/book/pipeline/docker/
          } else {
            dockerImage = docker.build("${registry}/${env.BRANCH_NAME}:${env.BUILD_ID}")
          }
        }
      }
    }

    stage("Docker push") {
      steps {

        script {
          docker.withRegistry('http://81.169.198.21:33345', registryCredential) {
            dockerImage.push()
            dockerImage.push('latest')
          }
        }
      }
    }
    stage("Deploy to staging") {

      steps {
        sh "echo 'Deploy to staging'"
        script {
          def dc = readFile('./deployment-config.templ.yml')
          if (env.BRANCH_NAME == 'master') {
            dcNamespace = 'live'
          } else if (env.BRANCH_NAME == 'develop') {
            dcNamespace = 'develop'
          }
          dc = dc.replaceAll('dockerimage',"${env.BRANCH_NAME}:${env.BUILD_ID}")
          dc = dc.replaceAll('dnamespace',"${dcNamespace}")
          writeFile(file: 'deployment-config.yml', text: dc)
          print dc
          sh(script: "kubectl --insecure-skip-tls-verify apply -f deployment-config.yml --namespace ${dcNamespace}", returnStdout: true)

        }
      }
    }

    stage("Acceptance test") {
      steps {
        sh "echo 'Acceptance test'"

      }
    }
  }
  post {
    always {
      sh "echo 'Acceptance test'"
      sh "docker image prune -a -f --filter label=stage=builder"
      sh "docker image prune -a -f --filter label=stage=output"
    }
  }
}
