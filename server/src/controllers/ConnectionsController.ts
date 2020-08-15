import { Request, Response } from 'express'

import Connection from '../entities/Connection'

export default class ConnectionsController {
  async index(_request: Request, response: Response): Promise<Response> {
    const totalConnections = await Connection.count()

    return response.json({ total: Number(totalConnections) })
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body

    await Connection.insert({ user_id })

    return response.status(201).send()
  }
}
