import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateUser from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ }: HttpContextContract) {
    return User.all()
  }

  public async store({ request }: HttpContextContract) {
    await request.validate(CreateUser)
    const data = request.only(['email', 'password'])

    return await User.create(data)
  }

  public async show({ params: { id } }: HttpContextContract) {
    return User.findOrFail(id)
  }

  public async profile({ params: { id } }: HttpContextContract) {
    const user = await User.findOrFail(id)

    return ((
      { updated_at, created_at, email, ...data }
    ) => data)(user.toJSON())
  }

  public async showTickets({ params: { id } }: HttpContextContract) {
    const user = await User.findOrFail(id)
    await user.load('tickets', ticketsBuilder =>
      ticketsBuilder.preload('creator').preload('helper')
    )

    return user.tickets
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
