import express from 'express'

import ConnectionsController from './ConnectionsController'

const connectionsRouter = express.Router()
const connectionsController = new ConnectionsController()

connectionsRouter.get('/', connectionsController.index)
connectionsRouter.post('/', connectionsController.create)

export default connectionsRouter
