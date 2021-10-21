import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  public async login({ auth, request }: HttpContextContract) {
    await request.validate(LoginValidator)

    const { email, password } = await request.only(['email', 'password'])
    return (await auth.use('api').attempt(email, password))
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return { success: auth.isLoggedOut }
  }
}
