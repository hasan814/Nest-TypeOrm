import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogEntity } from './entities/blog.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(@InjectRepository(BlogEntity) private blogRepository: Repository<BlogEntity>) { }
  async create(createBlogDto: CreateBlogDto) {
    const { text, title, userId } = createBlogDto
    return { message: "Blog created Successfully" }
  }

  async findAll() {
    return await this.blogRepository.find({
      relations: { user: true },
      select: { user: { first_name: true, last_name: true } }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
