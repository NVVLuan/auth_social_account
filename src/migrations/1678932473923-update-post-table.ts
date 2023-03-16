import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1678932473923 implements MigrationInterface {
    name = 'updatePostTable1678932473923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`active\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`active\``);
    }

}
