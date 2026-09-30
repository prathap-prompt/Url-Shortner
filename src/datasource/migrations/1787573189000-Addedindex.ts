import { MigrationInterface, QueryRunner } from "typeorm";

export class Addedindex1787573189000 implements MigrationInterface {
    name = 'Addedindex1787573189000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_5b194a4470977b71ff490dfc64" ON "urls"  ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b221adba02a6df07a7d274ccad" ON "url_click"  ("url_id", "clickedAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b221adba02a6df07a7d274ccad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5b194a4470977b71ff490dfc64"`);
    }

}
