import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RankException from 'App/Exceptions/RankException'
import { UserRoles } from 'Contracts/enums'

export default class CheckRank {
  protected async checkRank(
    { auth, response, params, request }: HttpContextContract,
    minRole
  ) {

    const user = auth.use('api').user
    const roles = Object.values(UserRoles)
    const minRolePosition = roles.indexOf(minRole)

    const [, path] = request.url().split('/').filter(Boolean)
    const self = ['users'].includes(path) && params.id === '@me'
    params.id = self ? user?.id : params.id

    if (roles.indexOf(user!.role) >= minRolePosition || self) {
      return true
    }

    throw new RankException('Você não possui o cargo necessário para executar esta ação', 403, 'E_UNAUTHORIZED_ACCESS')
  }

  public async handle(contract: HttpContextContract,
    next: () => Promise<void>,
    [minRole]
  ) {
    await contract.auth.authenticate()
    await this.checkRank(contract, minRole)

    await next()
  }
}
