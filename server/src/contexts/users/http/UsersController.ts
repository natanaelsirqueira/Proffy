import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { hash } from 'bcrypt'

import { CreateUserDTO } from '../dtos/CreateUserDTO'
import UsersCommands from '../UsersCommands'
import UsersQueries from '../UsersQueries'

const usersCommands = container.resolve(UsersCommands)
const usersQueries = container.resolve(UsersQueries)

export default class UsersController {
  async index(_request: Request, response: Response): Promise<Response> {
    const users = await usersQueries.listUsers()

    return response.json(users)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { first_name, last_name, email, password } = request.body

    try {
      const hashedPassword = await hash(password, 10)

      const user = {
        first_name,
        last_name,
        email,
        password: hashedPassword,
      } as CreateUserDTO

      await usersCommands.createUser(user)

      return response.status(201).send()
    } catch (error) {
      console.error(error)

      return response
        .status(400)
        .json({ error: 'Unexpected error while creating user' })
    }
  }
}
