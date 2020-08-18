import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ConnectionsCommands from '../ConnectionsCommands'
import ConnectionsQueries from '../ConnectionsQueries'

const connectionsCommands = container.resolve(ConnectionsCommands)
const connectionsQueries = container.resolve(ConnectionsQueries)

export default class ConnectionsController {
  async index(_request: Request, response: Response): Promise<Response> {
    const total = await connectionsQueries.getTotalConnections()

    return response.json({ total })
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body

    await connectionsCommands.createConnection(user_id)

    return response.status(201).send()
  }
}
