import { Injectable } from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { PostEntity } from "./entities/post.entity";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostService extends TypeOrmCrudService<PostEntity> {
  constructor(@InjectRepository(PostEntity) public postRepository: Repository<PostEntity>) {
    super(postRepository);
  }

  create(postData: CreatePostDto): Promise<CreatePostDto & PostEntity> {
    return this.postRepository.save(postData)
  }

  delete(postId: string): Promise<DeleteResult> {
    return this.postRepository.delete(postId)
  }
}