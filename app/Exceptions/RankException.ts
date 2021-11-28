import CommonException from './CommonException'

export default class RankException extends CommonException {
  constructor(
    message: string = 'Você não possui permissão para executar esta ação',
    status: number = 403,
    code: string = 'E_INSUFICIENT_PERMISSION'
  ) {
    super(message, status, code)
  }
}
