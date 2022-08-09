import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { CategoryService } from "./category.service";
import { Category } from "./entities/category.entity";


@Crud({
  model: {
    type: Category,
  },
})
@ApiTags("categories")
@Controller("categories")
@ApiBearerAuth()
export class CategoryController implements CrudController<Category> {
  constructor(public service: CategoryService) { }
}