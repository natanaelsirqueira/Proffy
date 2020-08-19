import express from 'express'

import usersRouter from '@contexts/users/http/router'
import classesRouter from '@contexts/classes/http/router'
import connectionsRouter from '@contexts/connections/http/router'

const router = express.Router()

router.use('/users', usersRouter)
router.use('/classes', classesRouter)
router.use('/connections', connectionsRouter)

export default router
