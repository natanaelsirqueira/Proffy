import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm'

@Entity('connections')
class Connection extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  user_id: number

  @CreateDateColumn()
  created_at: Date
}

export default Connection
