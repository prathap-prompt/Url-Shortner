import { MigrationInterface, QueryRunner } from "typeorm";

export class Addcountycolumn1787547545785 implements MigrationInterface {
    name = 'Addcountycolumn1787547545785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "url_click" ADD "country" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "url_click" DROP COLUMN "country"`);
    }

}
