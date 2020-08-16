import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateClassSchedule1597585073948 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'class_schedule',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'class_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'week_day',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'from',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'to',
            type: 'int',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['class_id'],
            referencedTableName: 'classes',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('class_schedule')
  }
}
