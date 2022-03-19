import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../shared/abstract-entity";
import { Category } from "../../category/entities/category.entity";

export enum Status {
    PUBLISHED = 'published',
    DRAFT = 'draft',
    REJECTED = 'rejected'
}
@Entity('posts')
export class Post extends AbstractEntity {
    @Column()
    title: string

    @Column({ type: 'enum', enum: Status, default: Status.DRAFT })
    status: Status

    @Column()
    content: string

    @ManyToOne(() => Category, c => c.posts)
    @JoinColumn({ name: "category_id" })
    category: Category
}
