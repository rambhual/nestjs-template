import { Column, Entity, OneToMany } from "typeorm";
import { PostEntity } from "@core/post/entities/post.entity";
import { AbstractEntity } from "@shared/abstract-entity";

@Entity('category')
export class Category extends AbstractEntity {
    @Column()
    title: string

    @OneToMany(() => PostEntity, p => p.category)
    posts: PostEntity[]
}
