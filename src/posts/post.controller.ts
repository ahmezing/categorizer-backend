import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //add post
  @Post()
  async addPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.addPost(createPostDto);
  }

  //get posts
  @Get()
  async getPosts(@Query('category') category?: string) {
    if (category) {
      return this.postService.getPostsByCategory(category);
    } else {
      return this.postService.getPosts();
    }
  }
  
  //get post by id
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
}
