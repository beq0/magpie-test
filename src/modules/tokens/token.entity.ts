import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/base-entity';

@Entity('tokens')
export class Token extends BaseEntity {
  @Column()
  symbol: string;

  @Column()
  decimals: string;

  @Column()
  totalSupply: string;

  @Column()
  derivedETH: string;
}
