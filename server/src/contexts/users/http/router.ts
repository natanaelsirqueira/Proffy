import express from 'express'

import UsersController from './UsersController'

const usersRouter = express.Router()
const usersController = new UsersController()

usersRouter.get('/', usersController.index)
usersRouter.post('/', usersController.create)

export default usersRouter
