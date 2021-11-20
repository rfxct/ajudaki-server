import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new RankException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class RankException extends Exception {
  constructor(
    message: string = 'Você não possui permissão para executar esta ação',
    status: number = 403,
    code: string = 'E_INSUFICIENT_PERMISSION'
    ) {
    super(message, status, code)
  }
}
