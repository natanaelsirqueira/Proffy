import knex from 'knex'

const db = knex({
  client: 'pg',
  version: '13',
  connection: process.env.PG_CONNECTION_STRING,
})

export default db
