import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'

import User from '../../users/entities/User'
import ClassSchedule from './ClassSchedule'

@Entity('classes')
class Class extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  subject: string

  @Column()
  cost: number

  @Column()
  user_id: number

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @OneToMany(() => ClassSchedule, classSchedule => classSchedule.class)
  schedule: ClassSchedule
}

export default Class
