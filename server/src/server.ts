import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import './database'

import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use((req, _resp, next) => {
  console.log('\n' + new Date())
  console.log(`New ${req.method} request ${req.path}`)
  req.body && console.log('Body:', req.body)
  req.query && console.log('Query:', req.query)
  req.params && console.log('Params:', req.params)
  next()
})

app.use(routes)

const port = process.env.PORT || 3333

app.listen(port, () => console.log('App running on port', port))
