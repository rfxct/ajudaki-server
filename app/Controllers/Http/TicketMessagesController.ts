import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TicketMessage from 'App/Models/TicketMessage'
import CreateTicketMessage from 'App/Validators/CreateTicketMessageValidator'

export default class TicketMessagesController {
  public async index({ }: HttpContextContract) {
  }

  public async store({ auth, request, params: { ticketId } }: HttpContextContract) {
    await request.validate(CreateTicketMessage)
    const data = request.only(['content'])
    const authorId = auth.use('api').user?.id

    return await TicketMessage.create({ authorId, ticketId, ...data })
  }

  public async show({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
