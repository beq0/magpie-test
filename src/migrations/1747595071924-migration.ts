import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1747595071924 implements MigrationInterface {
  name = 'Migration1747595071924';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "symbol" character varying NOT NULL, "decimals" character varying NOT NULL, "totalSupply" character varying NOT NULL, "derivedETH" character varying NOT NULL, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ticks" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "poolId" character varying NOT NULL, "liquidityGross" character varying NOT NULL, "liquidityNet" character varying NOT NULL, "price0" character varying NOT NULL, "price1" character varying NOT NULL, CONSTRAINT "PK_d29dabc03f2d559d30a1f69ae5b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pools" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "token0Id" character varying NOT NULL, "token1Id" character varying NOT NULL, "feeTier" character varying NOT NULL, "sqrtPrice" character varying NOT NULL, "liquidity" character varying NOT NULL, "createdAtTimestamp" character varying NOT NULL, CONSTRAINT "PK_6708c86fc389259de3ee43230ee" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pools"`);
    await queryRunner.query(`DROP TABLE "ticks"`);
    await queryRunner.query(`DROP TABLE "tokens"`);
  }
}
