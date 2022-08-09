import { ForbiddenError } from "@casl/ability";
import { Body, Controller, ForbiddenException, Post, UseGuards, } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";
import { AbilityFactoryService, Action } from "@ability/ability-factory.service";
import { UserEntity } from "@core/user/entities/user.entity";
import { CheckAbilities } from "../ability/ability.decorator";
import { AbilityGuard } from "../ability/ability.guard";
import { CurrentUser } from "../core/auth/decorators/current-user.decorator";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostEntity } from "./entities/post.entity";
import { PostService } from "./post.service";


@Crud({
  model: {
    type: PostEntity,
  },
  query: {
    join: {
      category: {
        eager: true
      }
    }
  },
  routes: {
    getManyBase: {
      decorators: [CheckAbilities({ action: Action.Read, subject: PostEntity })]
    },
    deleteOneBase: {
      decorators: [CheckAbilities({ action: Action.Delete, subject: PostEntity })]
    }
  }

})
@CrudAuth({
  property: "user",
  filter: (user: UserEntity) => ({
    user_id: user.id,
  }),
})

@ApiTags('posts')
@Controller("posts")
@UseGuards(AbilityGuard)
export class PostController implements CrudController<PostEntity> {
  constructor(public service: PostService, private readonly abilityFactory: AbilityFactoryService) { }


  @Post()
  create(@CurrentUser() user: UserEntity, @Body() createPostDto: CreatePostDto) {
    const ability = this.abilityFactory.defineAbility(user)
    try {
      ForbiddenError.from(ability).setMessage('you are not authorized to create post sorry')
        .throwUnlessCan(Action.Create, PostEntity)
      createPostDto.user_id = user.id
      return this.service.create(createPostDto)
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }

  // @Delete(":id")
  // // @CheckAbilities(new DeletePostAbility())
  // deletePost(@Param('id') postId: string): Promise<DeleteResult> {
  //   return this.service.delete(postId)
  // }
}