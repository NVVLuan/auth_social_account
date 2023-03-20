import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1679285941816 implements MigrationInterface {
    name = 'updatePostTable1679285941816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account\` CHANGE \`userNameAccount\` \`userName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP COLUMN \`userName\``);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD \`userName\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_account\` DROP COLUMN \`userName\``);
        await queryRunner.query(`ALTER TABLE \`user_account\` ADD \`userName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_account\` CHANGE \`userName\` \`userNameAccount\` varchar(255) NOT NULL`);
    }

}
