import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTimestampDefaults1786510000000 implements MigrationInterface {
    name = 'AddUserTimestampDefaults1786510000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "Created_at" SET DEFAULT now()');
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now()');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "updated_at" DROP DEFAULT');
        await queryRunner.query('ALTER TABLE "user" ALTER COLUMN "Created_at" DROP DEFAULT');
    }
}