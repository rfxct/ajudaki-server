import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CreateUser from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'

export default class UsersController {
  public async index ({ }: HttpContextContract) {
    const user = await User.find(1)
    await user?.load('tickets')
    return user
  }

  public async store ({ request }: HttpContextContract) {
    await request.validate(CreateUser)
    const data = request.only(['email', 'password'])

    return await User.create(data)
  }

  public async show ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
