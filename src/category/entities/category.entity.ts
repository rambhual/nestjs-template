import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "../../shared/abstract-entity";

@Entity('category')
export class Category extends AbstractEntity {
    @Column()
    title: string

    @OneToMany(() => PostEntity, p => p.category)
    posts: PostEntity[]
}
