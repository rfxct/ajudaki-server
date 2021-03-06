import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateUser from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'
import Ticket from 'App/Models/Ticket'
import { UserRoles } from 'Contracts/enums'
import RankException from 'App/Exceptions/RankException'

export default class UsersController {
  public async index({ }: HttpContextContract) {
    return User.all()
  }

  public async store({ request }: HttpContextContract) {
    await request.validate(CreateUser)
    const data = request.only(['email', 'password', 'first_name', 'last_name'])

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

  public async showTickets({ request, params: { id } }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10

    const tickets = await Ticket
      .query()
      .where('created_by', id)
      .preload('creator')
      .preload('helper')
      .paginate(page, limit)

    return tickets
  }

  public async showAssignedTickets({ request, params: { id } }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10

    const tickets = await Ticket
      .query()
      .where('assigned_to', id)
      .preload('creator')
      .preload('helper')
      .paginate(page, limit)

    return tickets
  }

  public async destroy({ params: { id } }: HttpContextContract) {
    const user = await User.findOrFail(id)
    if (user.role === UserRoles.ADMIN) throw new RankException('Você não possui permissão para deletar este usuário')

    await user.delete()
  }
}
