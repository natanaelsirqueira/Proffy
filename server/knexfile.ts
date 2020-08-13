import 'dotenv/config'

import path from 'path'

module.exports = {
  client: 'pg',
  version: '13',
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
}
