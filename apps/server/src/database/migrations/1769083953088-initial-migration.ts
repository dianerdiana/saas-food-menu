import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1769083953088 implements MigrationInterface {
    name = 'InitialMigration1769083953088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" ALTER COLUMN "phone" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stores" ALTER COLUMN "phone" SET NOT NULL`);
    }

}
