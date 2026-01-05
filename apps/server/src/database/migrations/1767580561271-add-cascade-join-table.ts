import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeJoinTable1767580561271 implements MigrationInterface {
    name = 'AddCascadeJoinTable1767580561271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_ingredients" DROP CONSTRAINT "FK_8107791a5f09a9008a5e8f738de"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" DROP CONSTRAINT "FK_0ea1320d8c1d91935990d72207b"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" DROP CONSTRAINT "FK_0efbdd77a5497be5c50613b4f0e"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" DROP CONSTRAINT "FK_2da52a63061f2c51bb4dacb4ef5"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" DROP CONSTRAINT "FK_04c6e59f037eb2a72ca672d44f5"`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" DROP CONSTRAINT "FK_5323b38d68a810be4523a0c47ef"`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" DROP CONSTRAINT "FK_94442765f92e2d15a36f5fc0fd6"`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" DROP CONSTRAINT "FK_f4109b12c6b67bac8015a6bdeb0"`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" DROP CONSTRAINT "FK_e3b5f0a16b1437c6f20c2d522ca"`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" DROP CONSTRAINT "FK_7bb94b5b720e9be1a6b8ffc8562"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_a55e7448df5157ac4118808679b"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_7a1bc6cfd73556e6fff9ff1a80a"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_66bf1d237f3576eeae37ac1b2eb"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_8748b4a0e8de6d266f2bbc877f6"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_9148da8f26fc248e77a387e3112"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" ADD CONSTRAINT "FK_04c6e59f037eb2a72ca672d44f5" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" ADD CONSTRAINT "FK_2da52a63061f2c51bb4dacb4ef5" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" ADD CONSTRAINT "FK_e3b5f0a16b1437c6f20c2d522ca" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" ADD CONSTRAINT "FK_7bb94b5b720e9be1a6b8ffc8562" FOREIGN KEY ("recommendation_id") REFERENCES "recommendations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_8748b4a0e8de6d266f2bbc877f6" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_9148da8f26fc248e77a387e3112" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_9148da8f26fc248e77a387e3112"`);
        await queryRunner.query(`ALTER TABLE "product_categories" DROP CONSTRAINT "FK_8748b4a0e8de6d266f2bbc877f6"`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" DROP CONSTRAINT "FK_7bb94b5b720e9be1a6b8ffc8562"`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" DROP CONSTRAINT "FK_e3b5f0a16b1437c6f20c2d522ca"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" DROP CONSTRAINT "FK_2da52a63061f2c51bb4dacb4ef5"`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" DROP CONSTRAINT "FK_04c6e59f037eb2a72ca672d44f5"`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD "updated_by" uuid`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD "created_by" uuid`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" ADD "updated_by" uuid`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" ADD "created_by" uuid`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" ADD "deleted_by" uuid`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" ADD "updated_by" uuid`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" ADD "created_by" uuid`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_9148da8f26fc248e77a387e3112" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_8748b4a0e8de6d266f2bbc877f6" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_66bf1d237f3576eeae37ac1b2eb" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_7a1bc6cfd73556e6fff9ff1a80a" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories" ADD CONSTRAINT "FK_a55e7448df5157ac4118808679b" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" ADD CONSTRAINT "FK_7bb94b5b720e9be1a6b8ffc8562" FOREIGN KEY ("recommendation_id") REFERENCES "recommendations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" ADD CONSTRAINT "FK_e3b5f0a16b1437c6f20c2d522ca" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" ADD CONSTRAINT "FK_f4109b12c6b67bac8015a6bdeb0" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" ADD CONSTRAINT "FK_94442765f92e2d15a36f5fc0fd6" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_recommendations" ADD CONSTRAINT "FK_5323b38d68a810be4523a0c47ef" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" ADD CONSTRAINT "FK_04c6e59f037eb2a72ca672d44f5" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" ADD CONSTRAINT "FK_2da52a63061f2c51bb4dacb4ef5" FOREIGN KEY ("ingredient_id") REFERENCES "ingredients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" ADD CONSTRAINT "FK_0efbdd77a5497be5c50613b4f0e" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" ADD CONSTRAINT "FK_0ea1320d8c1d91935990d72207b" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_ingredients" ADD CONSTRAINT "FK_8107791a5f09a9008a5e8f738de" FOREIGN KEY ("deleted_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
