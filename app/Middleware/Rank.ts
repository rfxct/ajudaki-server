import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserRoles } from 'Contracts/enums'

export default class CheckRank {
  protected async checkRank(response: HttpContextContract['response'], user, minRole) {
    const roles = Object.values(UserRoles)
    const minRolePosition = roles.indexOf(minRole)

    if (roles.indexOf(user!.role) >= minRolePosition) {
      return true
    }

    return response.status(403).send({
      errors: [{
        message: "E_UNAUTHORIZED_ACCESS: Você não possui o cargo necessário para executar esta ação"
      }]
    })
  }

  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    [minRole]
  ) {
    await auth.authenticate()

    const user = auth.use('api').user
    await this.checkRank(response, user, minRole)

    await next()
  }
}
