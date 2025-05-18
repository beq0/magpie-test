import {CreateDateColumn, PrimaryColumn, UpdateDateColumn} from "typeorm";

export class BaseEntity {
    @PrimaryColumn()
    id: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
