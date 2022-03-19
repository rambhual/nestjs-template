import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostService extends TypeOrmCrudService<Post> {
  constructor(@InjectRepository(Post) postRepository: Repository<Post>) {
    super(postRepository);
  }
}