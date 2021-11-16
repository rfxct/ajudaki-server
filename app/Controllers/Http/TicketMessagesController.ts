import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ticket from 'App/Models/Ticket'
import TicketMessage from 'App/Models/TicketMessage'
import CreateTicketMessage from 'App/Validators/CreateTicketMessageValidator'

export default class TicketMessagesController {
  public async index({ }: HttpContextContract) {
  }

  public async store({ auth, request, response, params: { ticketId } }: HttpContextContract) {
    await request.validate(CreateTicketMessage)
    const data = request.only(['content'])
    const authorId = auth.use('api').user?.id

    const parentTicket = await Ticket.find(ticketId)
    if (!parentTicket) return response.status(400).send({
      errors: [{
        message: `E_BAD_REQUEST: Não existe um ticket para o id ${ticketId}`
      }]
    })
    return await TicketMessage.create({ authorId, ticketId, ...data })
  }

  public async show({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
