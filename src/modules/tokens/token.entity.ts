import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/base-entity';

@Entity('tokens')
export class Token extends BaseEntity {
  @Column({ nullable: true })
  symbol?: string;

  @Column({ nullable: true })
  decimals?: string;

  @Column({ nullable: true })
  totalSupply?: string;

  @Column({ nullable: true })
  derivedETH?: string;
}
