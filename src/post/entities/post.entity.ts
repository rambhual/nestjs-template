import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "../../shared/abstract-entity";
import { Category } from "../../category/entities/category.entity";
import { UserEntity } from "../../user/entities/user.entity";

export enum Status {
    PUBLISHED = 'published',
    DRAFT = 'draft',
    REJECTED = 'rejected'
}
@Entity('posts')
export class PostEntity extends AbstractEntity {
    @Column()
    title: string

    @Column({ type: 'enum', enum: Status, default: Status.DRAFT })
    status: Status

    @Column()
    content: string

    @ManyToOne(() => Category, c => c.posts)
    @JoinColumn({ name: "category_id" })
    category: Category

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: "user_id" })
    user: UserEntity

    @Column({ type: "uuid", nullable: true })
    user_id: string

}
