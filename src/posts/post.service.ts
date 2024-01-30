import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { OpenAIService } from '../openai/openai.service';


@Injectable()
export class PostService {
  private dynamoDb: DynamoDBDocumentClient;


  constructor(private readonly openAIService: OpenAIService) {
    const client = new DynamoDBClient({ region: process.env.AWS_REGION_CODE });
    this.dynamoDb = DynamoDBDocumentClient.from(client);
}

  async addPost(createPostDto: CreatePostDto): Promise<any> {
    try {
    const newUniquePostId = uuidv4(); // Generate a unique ID for the new post
    const category = await this.openAIService.categorizePost(createPostDto.title, createPostDto.body);
    const params = {
      TableName: 'Posts',
      Item: {
        id: newUniquePostId, 
        author: createPostDto.author,
        title: createPostDto.title,
        body: createPostDto.body,
        category: category,
      },
    };
  
      return this.dynamoDb.send(new PutCommand(params));

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
    return this.dynamoDb.send(new QueryCommand(params));
  }

  async getPosts(): Promise<any> {
    const params = {
      TableName: 'Posts',
    };
    return this.dynamoDb.send(new ScanCommand(params));
  }

  async getPostById(id: string): Promise<any> {
    const params = {
      TableName: 'Posts',
      Key: {
        id: id,
      },
    };
    return this.dynamoDb.send(new GetCommand(params));
  }
}
