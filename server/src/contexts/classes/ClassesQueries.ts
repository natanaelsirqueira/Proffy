import { singleton } from 'tsyringe'
import { classToClass } from 'class-transformer'
import { getRepository } from 'typeorm'

import ClassesFiltersDTO from './dtos/ClassesFiltersDTO'
import Class from './entities/Class'

@singleton()
export default class ClassesQueries {
  async listClassesBy(filters: ClassesFiltersDTO): Promise<Class[]> {
    const { subject, week_day, time } = filters

    const classes = await getRepository(Class)
      .createQueryBuilder('class')
      .innerJoinAndSelect('class.user', 'user')
      .leftJoinAndSelect('class.schedule', 'class_schedule')
      .where('class.subject = :subject', { subject })
      .andWhere('class_schedule.week_day = :week_day', { week_day })
      .andWhere('class_schedule.from <= :from', { from: time })
      .andWhere('class_schedule.to > :to', { to: time })
      .getMany()

    return classToClass(classes)
  }
}
