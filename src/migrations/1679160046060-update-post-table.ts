import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1679160046060 implements MigrationInterface {
    name = 'updatePostTable1679160046060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_detail\` DROP COLUMN \`active\``);
        await queryRunner.query(`ALTER TABLE \`user_detail\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user_detail\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD \`active\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP COLUMN \`active\``);
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user_detail\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_detail\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_detail\` ADD \`active\` tinyint NOT NULL DEFAULT '0'`);
    }

}
