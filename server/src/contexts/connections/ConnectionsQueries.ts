import { singleton } from 'tsyringe'

import Connection from './entities/Connection'

@singleton()
export default class ConnectionsRepo {
  async getTotalConnections(): Promise<number> {
    const total = await Connection.count()

    return Number(total)
  }
}
