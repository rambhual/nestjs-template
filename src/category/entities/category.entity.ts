import { Post } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "../../shared/abstract-entity";

@Entity('category')
export class Category extends AbstractEntity {
    @Column()
    title: string

    @OneToMany(() => Post, p => p.category)
    posts: Post[]
}
