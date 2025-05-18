import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/base-entity';

@Entity('pools')
export class Pool extends BaseEntity {
  @Column()
  token0Id: string;

  @Column()
  token1Id: string;

  @Column()
  feeTier: string;

  @Column()
  sqrtPrice: string;

  @Column()
  liquidity: string;

  @Column()
  createdAtTimestamp: string;
}
