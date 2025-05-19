import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/base-entity';

@Entity('ticks')
export class Tick extends BaseEntity {
  @Column()
  poolId: string;

  @Column()
  liquidityGross: string;

  @Column()
  liquidityNet: string;

  @Column({ nullable: true })
  price0?: string;

  @Column({ nullable: true })
  price1?: string;
}
