import { Exception } from '@adonisjs/core/build/standalone'

export default class CommonException extends Exception {
  constructor(
    message: string = 'Ocorreu um erro',
    status: number = 503,
    code: string = 'E_COMMON'
  ) {
    super(message, status, code)
  }

  handle(_, ctx) {
    ctx.response.status(this.status).send({
      errors: [{ message: this.message, code: this.code }]
    })
  }
}
