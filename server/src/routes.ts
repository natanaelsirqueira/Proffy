import express, { Request, Response } from 'express'

import db from './database/connection'

const routes = express.Router()

routes.post('/classes', async (request: Request, response: Response) => {
  return response.json({ name: 'Natanael' })
})

export default routes
