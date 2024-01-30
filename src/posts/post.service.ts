import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class PostService {
  private dynamoDb: AWS.DynamoDB.DocumentClient;


  constructor() {
    AWS.config.update({ region: `${process.env.AWS_REGION}` }); 
    this.dynamoDb = new AWS.DynamoDB.DocumentClient();
}

  async addPost(createPostDto: CreatePostDto): Promise<any> {
    try {
    const newUniquePostId = uuidv4(); // Generate a unique ID for the new post
    const params = {
      TableName: 'Posts',
      Item: {
        id: newUniquePostId, 
        author: createPostDto.author,
        title: createPostDto.title,
        body: createPostDto.body,
        category: 'test',
      },
    };
  
      return this.dynamoDb.put(params).promise();

    } catch (error) {
      return error;
    }
  }

  async getPostsByCategory(category: string): Promise<any> {
    const params = {
      TableName: 'Posts',
      IndexName: 'category-index',
      KeyConditionExpression: 'category = :category',
      ExpressionAttributeValues: {
        ':category': category,
      },
    };
    return this.dynamoDb.query(params).promise();
  }

  async getPostById(id: string): Promise<any> {
    const params = {
      TableName: 'Posts',
      Key: {
        id: id,
      },
    };
    return this.dynamoDb.get(params).promise();
  }
}
