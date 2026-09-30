import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClickCountToUrls1787114578835 implements MigrationInterface {
    name = 'AddClickCountToUrls1787114578835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" ADD "clickcount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "clickcount"`);
    }

}
