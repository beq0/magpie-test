import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1747685760505 implements MigrationInterface {
  name = 'Migration1747685760505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "symbol" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "decimals" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "totalSupply" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "derivedETH" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticks" ALTER COLUMN "price0" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticks" ALTER COLUMN "price1" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ticks" ALTER COLUMN "price1" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ticks" ALTER COLUMN "price0" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "derivedETH" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "totalSupply" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "decimals" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tokens" ALTER COLUMN "symbol" SET NOT NULL`,
    );
  }
}
