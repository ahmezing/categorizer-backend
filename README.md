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
- **AWS CLI**: The AWS Command Line Interface must be installed and configured with an AWS account. This project utilizes AWS services like Lambda and DynamoDB, so having the AWS CLI configured is essential.
    - If you haven't already, create an AWS account and an IAM user with administrative access. Then, configure the AWS CLI with the credentials of this IAM user. Follow the official AWS guide for [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).
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

3. **DynamoDB Setup**
    - You need to create a DynamoDB table in your AWS account to store the blog posts.
    - Use the AWS Management Console or AWS CLI to create a table. Here’s a simple CLI command to create a table:
      ```bash
      aws dynamodb create-table \
        --table-name Posts \
        --attribute-definitions AttributeName=id,AttributeType=S \
        --key-schema AttributeName=id,KeyType=HASH \
        --billing-mode PAY_PER_REQUEST
      ```
    - Make sure the table name matches the `DYNAMODB_TABLE_NAME` environment variable in the next step.
    - **Note**: Ensure the IAM user configured in your AWS CLI has permissions to create DynamoDB tables. This typically involves having the `AmazonDynamoDBFullAccess` policy attached to your IAM user or role.

4. **Environment Variables**
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
    - Before deploying, make sure you have the Serverless Framework installed globally on your machine. If not, you can install it with `npm install -g serverless`.
    - Update `serverless.yml` with your AWS configurations. This includes specifying your service name, provider details (like `region` and `runtime`), functions, events, and any resources your application needs.
    - **IAM Role**: Ensure the IAM role defined in `serverless.yml` has the necessary permissions for the services your application uses. This typically involves permissions for Lambda to access DynamoDB, invoke API Gateway, and any other AWS service interactions.
    - **Environment Variables**: Define any required environment variables in `serverless.yml` under the `provider` section. This includes variables like `DYNAMODB_TABLE_NAME` and `OPENAI_API_KEY`, which should match the environment variables you've set up locally.

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
