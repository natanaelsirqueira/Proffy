import express from 'express'

import ClassesController from './ClassesController'

const classesRouter = express.Router()
const classesController = new ClassesController()

classesRouter.get('/', classesController.index)
classesRouter.post('/', classesController.create)

export default classesRouter
