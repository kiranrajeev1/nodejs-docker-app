# Node.js User Login Application with CI/CD

This is a simple web application that demonstrates a user signup and login system built with Node.js, Express, and MongoDB. The entire project is containerized using Docker and includes a complete Continuous Integration and Continuous Deployment (CI/CD) pipeline managed by Jenkins.

## Features

- **User Signup**: New users can create an account with an email, username, and password.
- **Database Integration**: User data is stored in a MongoDB database.
- **Containerized**: The entire application stack (Node.js app, MongoDB, Mongo Express) is managed by Docker and Docker Compose for easy setup and deployment.
- **Automated CI/CD**: A Jenkins pipeline automatically builds, tests (in the future), pushes to Docker Hub, and deploys the application whenever changes are pushed to the repository.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Database UI**: Mongo Express
- **Containerization**: Docker, Docker Compose
- **CI/CD**: Jenkins (using a Declarative Pipeline)
- **Code Hosting**: GitHub

---

## Prerequisites

To run this project, you will need the following installed on your machine:
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

---

## How to Run Locally

You can run the entire application stack on your local machine with a single command.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/kiranrajeev1/nodejs-docker-app.git](https://github.com/kiranrajeev1/nodejs-docker-app.git)
    cd nodejs-docker-app
    ```

2.  **Start the application:**
    ```bash
    docker-compose up -d
    ```

3.  **Access the services:**
    - **Node.js Application**: [http://localhost:3000](http://localhost:3000)
    - **Mongo Express (Database UI)**: [http://localhost:8081](http://localhost:8081)

---

## CI/CD Pipeline Overview

This project is configured with a `Jenkinsfile` that automates the entire build and deployment process. The pipeline consists of the following stages:

1.  **Clone**: Checks out the latest code from the GitHub repository.
2.  **Build**: Builds a new Docker image for the Node.js application and tags it with a unique version (the Jenkins build number).
3.  **Docker Login**: Securely logs in to Docker Hub using credentials stored in Jenkins.
4.  **Push to Docker Hub**: Pushes the newly built and versioned image to a Docker Hub repository.
5.  **Deploy**: Uses Docker Compose to pull the new image from Docker Hub and start the application, database, and database UI containers.

This setup ensures that any change pushed to the GitHub repository is automatically built, versioned, and deployed, providing a complete and automated workflow.

---

#docker_commands

docker network create mongo-network

docker run -d -p27017:27017 --name mongo --network mongo-network -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=pass mongo

docker run -d -p8081:8081 --name mongo-express --network mongo-network -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=pass -e ME_CONFIG_MONGODB_URL="mongodb://admin:pass@mongo:27017" mongo-express

docker run -d --name node-app --network mongo-network -p 3000:3000 docker-testapp
