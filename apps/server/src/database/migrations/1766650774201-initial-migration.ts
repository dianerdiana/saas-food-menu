import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1766650774201 implements MigrationInterface {
    name = 'InitialMigration1766650774201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "banks" ADD "status" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "slug" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD "sequence" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "transaction_details" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "subscription_payments" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "stores" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "banks" ADD CONSTRAINT "FK_3f1871ad37cad23900b1b09bd1a" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_f3c4bdac3f0de84b9cfba867de8" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" ADD CONSTRAINT "FK_8107791a5f09a9008a5e8f738de" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_0f313a19b178e032a2be12d0941" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_details" ADD CONSTRAINT "FK_e579ff8f25b520cf70416e80623" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_f15ba121588fb6677280366ca5e" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_a55e7448df5157ac4118808679b" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_5f3e42e64bd478c794584ca1cf3" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription_payments" ADD CONSTRAINT "FK_ce0d033cdf205c69ddfc201d3b9" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_611360d97039ddc16cf2b9a7b92" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stores" ADD CONSTRAINT "FK_3784247700690669b56ac41d2ab" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_021e2c9d9dca9f0885e8d738326" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_021e2c9d9dca9f0885e8d738326"`);
        await queryRunner.query(`ALTER TABLE "stores" DROP CONSTRAINT "FK_3784247700690669b56ac41d2ab"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_611360d97039ddc16cf2b9a7b92"`);
        await queryRunner.query(`ALTER TABLE "subscription_payments" DROP CONSTRAINT "FK_ce0d033cdf205c69ddfc201d3b9"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_5f3e42e64bd478c794584ca1cf3"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_a55e7448df5157ac4118808679b"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_f15ba121588fb6677280366ca5e"`);
        await queryRunner.query(`ALTER TABLE "transaction_details" DROP CONSTRAINT "FK_e579ff8f25b520cf70416e80623"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_0f313a19b178e032a2be12d0941"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" DROP CONSTRAINT "FK_8107791a5f09a9008a5e8f738de"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_f3c4bdac3f0de84b9cfba867de8"`);
        await queryRunner.query(`ALTER TABLE "banks" DROP CONSTRAINT "FK_3f1871ad37cad23900b1b09bd1a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "stores" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "subscription_payments" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "transaction_details" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "sequence"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "ingredients" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "banks" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "banks" DROP COLUMN "deleted_by"`);
    }

}
