import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateTicketValidator {
  constructor (protected ctx: HttpContextContract) {
  }
  public schema = schema.create({
    subject: schema.string(),
    description: schema.string(),
  })

  public messages = {
    required: 'O campo {{ field }} é necessário para criar uma nova conta'
  }
}
