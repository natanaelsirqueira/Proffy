import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column()
  email: string

  @Exclude()
  @Column()
  password: string

  @Column()
  avatar: string

  @Column()
  whatsapp: string

  @Column()
  bio: string

  @Expose({ name: 'full_name' })
  getFullName(): string {
    return `${this.first_name} ${this.last_name}`
  }
}

export default User
