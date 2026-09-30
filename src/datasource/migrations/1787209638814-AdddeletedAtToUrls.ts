import { MigrationInterface, QueryRunner } from "typeorm";

export class AdddeletedAtToUrls1787209638814 implements MigrationInterface {
    name = 'AdddeletedAtToUrls1787209638814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "deletedAt"`);
    }

}
