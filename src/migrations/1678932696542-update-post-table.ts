import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1678932696542 implements MigrationInterface {
    name = 'updatePostTable1678932696542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`version\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`version\``);
    }

}
