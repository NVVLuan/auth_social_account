import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1678949341126 implements MigrationInterface {
    name = 'updatePostTable1678949341126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_detail\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`social\` (\`id\` varchar(36) NOT NULL, \`socialName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_account\` (\`id\` varchar(36) NOT NULL, \`userNameAccount\` varchar(255) NOT NULL, \`userDetailId\` varchar(36) NULL, UNIQUE INDEX \`REL_0290e17c035b858f05f8eb4d43\` (\`userDetailId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_account_socials_social\` (\`userAccountId\` varchar(36) NOT NULL, \`socialId\` varchar(36) NOT NULL, INDEX \`IDX_9cc83b3865bf199b583e688f17\` (\`userAccountId\`), INDEX \`IDX_ba8012b39d7ac9b67496f2a623\` (\`socialId\`), PRIMARY KEY (\`userAccountId\`, \`socialId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD CONSTRAINT \`FK_0290e17c035b858f05f8eb4d433\` FOREIGN KEY (\`userDetailId\`) REFERENCES \`user_detail\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_account_socials_social\` ADD CONSTRAINT \`FK_9cc83b3865bf199b583e688f175\` FOREIGN KEY (\`userAccountId\`) REFERENCES \`user_account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_account_socials_social\` ADD CONSTRAINT \`FK_ba8012b39d7ac9b67496f2a6238\` FOREIGN KEY (\`socialId\`) REFERENCES \`social\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account_socials_social\` DROP FOREIGN KEY \`FK_ba8012b39d7ac9b67496f2a6238\``);
        await queryRunner.query(`ALTER TABLE \`user_account_socials_social\` DROP FOREIGN KEY \`FK_9cc83b3865bf199b583e688f175\``);
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP FOREIGN KEY \`FK_0290e17c035b858f05f8eb4d433\``);
        await queryRunner.query(`DROP INDEX \`IDX_ba8012b39d7ac9b67496f2a623\` ON \`user_account_socials_social\``);
        await queryRunner.query(`DROP INDEX \`IDX_9cc83b3865bf199b583e688f17\` ON \`user_account_socials_social\``);
        await queryRunner.query(`DROP TABLE \`user_account_socials_social\``);
        await queryRunner.query(`DROP INDEX \`REL_0290e17c035b858f05f8eb4d43\` ON \`user_account\``);
        await queryRunner.query(`DROP TABLE \`user_account\``);
        await queryRunner.query(`DROP TABLE \`social\``);
        await queryRunner.query(`DROP TABLE \`user_detail\``);
    }

}
