import {Column, Entity} from 'typeorm';
import {BaseEntity} from "../../shared/base-entity";

@Entity('ticks')
export class Tick extends BaseEntity {
    @Column()
    poolId: string;

    @Column()
    liquidityGross: string;

    @Column()
    liquidityNet: string;

    @Column()
    price0: string;

    @Column()
    price1: string;
}
