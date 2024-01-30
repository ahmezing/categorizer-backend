import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAIService {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async categorizePost(title: string, body: string): Promise<string> {
    const response = await this.openAI.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user', 
        content: `${process.env.CATEGORIZATION_PROMPT} \n\nTitle: ${title}\n\nBody: ${body}`
      }],
      max_tokens: 60,
    });

    return response.choices[0].message.content;
  }
}