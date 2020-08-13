import { Request, Response } from 'express'

import db from '../database/connection'

export default class ConnectionsController {
  async index(_request: Request, response: Response): Promise<Response> {
    const totalConnections = await db('connections').count({ total: '*' })

    const { total } = totalConnections[0]

    return response.json({ total: Number(total) })
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body

    await db('connections').insert({ user_id })

    return response.status(201).send()
  }
}
