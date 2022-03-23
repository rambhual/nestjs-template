import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../../../shared/abstract-entity";

@Entity("reset")
export class Reset extends AbstractEntity {
    @Column()
    email: string

    @Column({ unique: true })
    token: string
}
