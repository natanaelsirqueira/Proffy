import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { getConnection } from 'typeorm'

import convertTimeToMinutes from '@common/utils/convertTimeToMinutes'
import UsersQueries from '@contexts/users/UsersQueries'

import ClassSchedule from '../entities/ClassSchedule'
import ClassesCommands from '../ClassesCommands'
import ClassesQueries from '../ClassesQueries'

const classesCommands = container.resolve(ClassesCommands)
const classesQueries = container.resolve(ClassesQueries)
const usersQueries = container.resolve(UsersQueries)

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

    const subject = filters.subject as string
    const time = filters.time as string

    const classes = await classesQueries.listClassesBy({
      subject,
      week_day: Number(filters.week_day),
      time: convertTimeToMinutes(time),
    })

    return response.json(classes)
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { user_id, subject, cost, schedule } = request.body

    try {
      await getConnection().transaction(async manager => {
        const user = await usersQueries.findUserById(user_id)

        if (!user) {
          return response
            .status(400)
            .json({ error: 'Error while creating class' })
        }

        const savedClass = await classesCommands.createClass({
          user_id,
          subject,
          cost,
        })

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
