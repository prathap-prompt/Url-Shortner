import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUrlIdToUuid1787043137302 implements MigrationInterface {
    name = 'UpdateUrlIdToUuid1787043137302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0"`);
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "urls" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "urls" ADD CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0"`);
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "urls" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "urls" ADD CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id")`);
    }

}
