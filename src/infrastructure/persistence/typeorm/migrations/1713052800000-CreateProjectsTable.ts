import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProjectsTable1713052800000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "projects",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "primary_color",
                        type: "varchar",
                    },
                    {
                        name: "logo_url",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "login_url",
                        type: "varchar",
                    },
                ],
            }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("projects");
    }
}
