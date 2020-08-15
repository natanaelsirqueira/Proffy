import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'

import Class from './Class'

@Entity('class_schedule')
class ClassSchedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  week_day: number

  @Column()
  from: number

  @Column()
  to: number

  @OneToOne(() => Class)
  @JoinColumn({ name: 'class_id' })
  class: Class
}

export default ClassSchedule
