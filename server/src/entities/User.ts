import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  avatar: string

  @Column()
  whatsapp: string

  @Column()
  bio: string
}

export default User
