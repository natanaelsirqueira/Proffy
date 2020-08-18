import { singleton } from 'tsyringe'

import Connection from './entities/Connection'

@singleton()
export default class ConnectionsRepo {
  async createConnection(user_id: number): Promise<Connection> {
    const connection = Connection.create({ user_id })

    return Connection.save(connection)
  }
}
