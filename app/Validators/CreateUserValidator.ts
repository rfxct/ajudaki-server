import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {
  }
  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' })
    ]),
    first_name: schema.string(),
    last_name: schema.string(),
    password: schema.string({}, [rules.confirmed()])
  })

  public messages = {
    required: 'O campo {{ field }} é necessário para criar uma nova conta',
    'email.unique': 'O e-mail fornecido já está em uso'
  }
}
