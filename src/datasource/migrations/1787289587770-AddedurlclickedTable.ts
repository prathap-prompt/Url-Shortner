import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedurlclickedTable1787289587770 implements MigrationInterface {
    name = 'AddedurlclickedTable1787289587770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "url_click" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clickedAt" TIMESTAMP NOT NULL DEFAULT now(), "ipaddress" character varying, "userAgent" character varying, "referrer" character varying, "url_id" uuid, CONSTRAINT "PK_ea21db880d9867e401cab89afe4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "url_click" ADD CONSTRAINT "FK_4ec1633b90e8e381d667bf322f9" FOREIGN KEY ("url_id") REFERENCES "urls"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "url_click" DROP CONSTRAINT "FK_4ec1633b90e8e381d667bf322f9"`);
        await queryRunner.query(`DROP TABLE "url_click"`);
    }

}
