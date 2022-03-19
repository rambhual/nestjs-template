
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../shared/abstract-entity';

@Entity('token')
export class TokenEntity extends AbstractEntity {
  @Column({ type: "uuid" })
  user_id: string;

  @Column()
  token: string

  @Column()
  expired_at: Date

  constructor(partial?: Partial<TokenEntity>) {
    super();
    Object.assign(this, partial);
  }
}
