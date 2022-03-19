import { Controller, } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { Post } from "./entities/post.entity";
import { PostService } from "./post.service";


@Crud({
  model: {
    type: Post,
  },
  query: {
    join: {
      category: {
        eager: true
      }
    }
  }

})
@ApiTags('posts')
@Controller("posts")
@ApiBearerAuth()

export class PostController implements CrudController<Post> {
  constructor(public service: PostService) { }
}