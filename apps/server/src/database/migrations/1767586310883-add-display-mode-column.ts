import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDisplayModeColumn1767586310883 implements MigrationInterface {
    name = 'AddDisplayModeColumn1767586310883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recommendations" ADD "display_mode" character varying(255) NOT NULL DEFAULT 'horizontal'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recommendations" DROP COLUMN "display_mode"`);
    }

}
