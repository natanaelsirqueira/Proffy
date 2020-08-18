import { singleton } from 'tsyringe'

import CreateClassDTO from './dtos/CreateClassDTO'
import Class from './entities/Class'

@singleton()
export default class ClassesCommands {
  async createClass(data: CreateClassDTO): Promise<Class> {
    const classEntity = Class.create(data)

    return Class.save(classEntity)
  }
}
