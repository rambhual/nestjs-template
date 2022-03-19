import { hashSync } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../shared/abstract-entity';

export enum RoleEnum {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  constructor(partial?: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
