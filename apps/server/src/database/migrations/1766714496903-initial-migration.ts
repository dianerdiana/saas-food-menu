import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1766714496903 implements MigrationInterface {
    name = 'InitialMigration1766714496903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
    }

}
