import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserUrlRelation1786944476689 implements MigrationInterface {
    name = 'AddUserUrlRelation1786944476689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "urls" ("id" SERIAL NOT NULL, "originalurl" character varying NOT NULL, "shorturl" character varying NOT NULL, "user_id" uuid, CONSTRAINT "UQ_c2a6a9d468bdcdba123f74a6aeb" UNIQUE ("shorturl"), CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "urls" ADD CONSTRAINT "FK_5b194a4470977b71ff490dfc64b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "FK_5b194a4470977b71ff490dfc64b"`);
        await queryRunner.query(`DROP TABLE "urls"`);
    }

}
