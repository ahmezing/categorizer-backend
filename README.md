# The Categorizer

## Overview
The Categorizer is a backend for a blogging platform built with Nest.js. It allows for creating, retrieving, and categorizing blog posts. The app integrates with AWS services for data storage and serverless execution and utilizes the OpenAI API for automatic post categorization.

## Features
- **Create New Blog Post**: Users can add a new post with an author name, title, and body.
- **Automatic Categorization**: The app categorizes each new post using the OpenAI API.
- **Fetch Posts**: Retrieve all posts or filter them by category.
- **Fetch Post by ID**: Retrieve details of a specific post using its ID.

## Technologies
- Nest.js
- TypeScript
- AWS (Lambda, DynamoDB, API Gateway, IAM, CloudWatch)
- OpenAI API

## Getting Started

### Prerequisites
- Node.js (v12+)
- npm (v6+)
- AWS CLI (configured with user credentials)
- OpenAI API key

### Installation
1. **Clone the Repository**
    ```bash
    git clone https://github.com/ahmezing/categorizer-backend
    cd categorizer-backend
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Environment Variables**
    - Set up the required environment variables:
      - `AWS_REGION_CODE`
      - `CATEGORIZATION_PROMPT`
      - `OPENAI_API_KEY`

4. **Running Locally**
    ```bash
    npm run start
    ```

## Deployment
Deploy the application to AWS Lambda:

1. **Configure the Serverless Framework**
    - Update `serverless.yml` with your AWS configurations.

2. **Deploy**
    ```bash
    serverless deploy
    ```

## API Endpoints
- **Add Post**: `POST /posts`
  - Body: `{ "author": "name", "title": "title", "body": "content" }`

- **Get All Posts**: `GET /posts`

- **Get Posts by Category**: `GET /posts?category=categoryName`

- **Get Post by ID**: `GET /posts/:id`


## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/ahmezing/categorizer-backend/blob/main/LICENSE) file for details.
