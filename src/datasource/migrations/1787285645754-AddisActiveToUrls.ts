import { MigrationInterface, QueryRunner } from "typeorm";

export class AddisActiveToUrls1787285645754 implements MigrationInterface {
    name = 'AddisActiveToUrls1787285645754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "isActive"`);
    }

}
