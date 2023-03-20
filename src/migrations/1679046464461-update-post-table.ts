import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1679046464461 implements MigrationInterface {
    name = 'updatePostTable1679046464461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_detail\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`email\` varchar(255) NOT NULL, \`photo\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_account\` (\`id\` varchar(36) NOT NULL, \`userNameAccount\` varchar(255) NOT NULL, \`userDetailId\` varchar(36) NULL, UNIQUE INDEX \`REL_0290e17c035b858f05f8eb4d43\` (\`userDetailId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`social\` (\`id\` varchar(36) NOT NULL, \`socialName\` varchar(255) NOT NULL, \`userAccountId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD CONSTRAINT \`FK_0290e17c035b858f05f8eb4d433\` FOREIGN KEY (\`userDetailId\`) REFERENCES \`user_detail\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`social\` ADD CONSTRAINT \`FK_0aed5e6d410c6cfc96affe51acc\` FOREIGN KEY (\`userAccountId\`) REFERENCES \`user_account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`social\` DROP FOREIGN KEY \`FK_0aed5e6d410c6cfc96affe51acc\``);
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP FOREIGN KEY \`FK_0290e17c035b858f05f8eb4d433\``);
        await queryRunner.query(`DROP TABLE \`social\``);
        await queryRunner.query(`DROP INDEX \`REL_0290e17c035b858f05f8eb4d43\` ON \`user_account\``);
        await queryRunner.query(`DROP TABLE \`user_account\``);
        await queryRunner.query(`DROP TABLE \`user_detail\``);
    }

}
