import { MigrationInterface, QueryRunner } from "typeorm";

export class AddexpirationdateToUrls1787204940234 implements MigrationInterface {
    name = 'AddexpirationdateToUrls1787204940234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" ADD "expiresAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "expiresAt"`);
    }

}
