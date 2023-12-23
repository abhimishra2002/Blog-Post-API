# Blog Post API

This is an BLOG POST API where user can sign up and sign in with proper authentication and get a web token on succesfull signin process.
User can check blogs and authentic user can add blogs and edit and delete their blogs
## Table of Contents
- [Local Setup](#local-setup)
  - [Environment Variables](#environment-variables)
  - [Installing Dependencies](#installing-dependencies)
  - [Starting the Project](#starting-the-project)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Routes](#api-routes)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [License](#license)

## Local Setup

### Environment Variables

Create a .env file in the project root with the following variables:

`
JWT_SECRET=your-jwt-secret
DATABASE_PASSWORD=your-database-password
DATABASE_NAME=your-database-name
`


### Environment Variables
Use the following command to install all the dependencies:

`
npm install
`

###**Starting the Project**

Ensure that the PORT=5000 is free, then use the following command to start the project:

`
npm start
`
