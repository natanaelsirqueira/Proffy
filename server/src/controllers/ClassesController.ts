import { Request, Response } from 'express'

import db from '../database/connection'
import convertTimeToMinutes from '../utils/convertTimeToMinutes'

interface ScheduleItem {
  weekDay: number
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

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(weekDay)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])

    return response.json(classes)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body

    const trx = await db.transaction()

    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      })

      const userId = insertedUsersIds[0]

      const insertedClassesIds = await trx('classes').insert({
        user_id: userId,
        subject,
        cost,
      })

      const classId = insertedClassesIds[0]

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id: classId,
          week_day: scheduleItem.weekDay,
          from: convertTimeToMinutes(scheduleItem.from),
          to: convertTimeToMinutes(scheduleItem.to),
        }
      })

      await trx('class_schedule').insert(classSchedule)

      await trx.commit()

      return response.status(201).send()
    } catch (error) {
      await trx.rollback()

      return response
        .status(400)
        .json({ error: 'Unexpected error while creating class' })
    }
  }
}
