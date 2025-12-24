import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1766581344948 implements MigrationInterface {
    name = 'InitialMigration1766581344948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "stores" ADD "latitude" numeric(10,8)`);
        await queryRunner.query(`ALTER TABLE "stores" ADD "longitude" numeric(11,8)`);
        await queryRunner.query(`ALTER TABLE "stores" ADD "address" text`);
        await queryRunner.query(`ALTER TABLE "stores" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "stores" ADD "location" text`);
    }

}
