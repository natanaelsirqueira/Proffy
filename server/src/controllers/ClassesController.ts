import { Request, Response } from 'express'
import { getRepository, getConnection } from 'typeorm'
import { hash } from 'bcrypt'
import { classToClass } from 'class-transformer'

import Class from '../entities/Class'
import ClassSchedule from '../entities/ClassSchedule'
import User from '../entities/User'
import convertTimeToMinutes from '../utils/convertTimeToMinutes'

interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

export default class ClassesController {
  async index(request: Request, response: Response): Promise<Response> {
    const filters = request.query

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response
        .status(400)
        .json({ error: 'Missing filters to search classes' })
    }

    const weekDay = filters.week_day as string
    const subject = filters.subject as string
    const time = filters.time as string

    const timeInMinutes = convertTimeToMinutes(time)

    const classes = await getRepository(Class)
      .createQueryBuilder('class')
      .innerJoinAndSelect('class.user', 'user')
      .leftJoinAndSelect('class.schedule', 'class_schedule')
      .where('class.subject = :subject', { subject })
      .andWhere('class_schedule.week_day = :week_day', {
        week_day: Number(weekDay),
      })
      .andWhere('class_schedule.from <= :from', { from: timeInMinutes })
      .andWhere('class_schedule.to > :to', { to: timeInMinutes })
      .getMany()

    return response.json(classToClass(classes))
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      first_name,
      last_name,
      email,
      password,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body

    try {
      const hashedPassword = await hash(password, 10)

      await getConnection().transaction(async manager => {
        const user = await manager.save(
          User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            avatar,
            whatsapp,
            bio,
          }),
        )

        const savedClass = await manager.save(
          Class.create({
            user,
            subject,
            cost,
          }),
        )

        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
          return ClassSchedule.create({
            class: savedClass,
            week_day: scheduleItem.week_day,
            from: convertTimeToMinutes(scheduleItem.from),
            to: convertTimeToMinutes(scheduleItem.to),
          })
        })

        await manager.save(classSchedule)
      })

      return response.status(201).send()
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Unexpected error while creating class' })
    }
  }
}
