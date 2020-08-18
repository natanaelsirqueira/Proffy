import { singleton } from 'tsyringe'

import { CreateUserDTO } from './dtos/CreateUserDTO'
import User from './entities/User'

@singleton()
export default class UsersCommands {
  async createUser(data: CreateUserDTO): Promise<User> {
    const user = User.create(data)

    return User.save(user)
  }
}
