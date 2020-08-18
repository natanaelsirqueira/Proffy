import { singleton } from 'tsyringe'
import { classToClass } from 'class-transformer'

import User from './entities/User'

@singleton()
export default class UsersQueries {
  async listUsers(): Promise<User[]> {
    const users = await User.find()

    return classToClass(users)
  }

  async findUserById(id: number): Promise<User | undefined> {
    return User.findOne({ where: { id } })
  }
}
