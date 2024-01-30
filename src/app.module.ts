import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './posts/post.controller';
import { PostService } from './posts/post.service';
import { OpenAIService } from './openai/openai.service';

@Module({
  imports: [],
  controllers: [AppController, PostController],
  providers: [AppService, PostService, OpenAIService],
})
export class AppModule {}
