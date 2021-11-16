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
    const authorId = auth.use('api').user!.id

    const parentTicket = await Ticket.query()
      .whereRaw('(created_by = :authorId OR assigned_to = :authorId) AND id = :ticketId', {
        authorId, ticketId
      }).first()

    if (!parentTicket) return response.status(403).send({
      errors: [{
        message: `E_ACCES_DENIED: Você não possui permissão para acessar o ticket de id ${ticketId}`
      }]
    })

    const message = await TicketMessage.create({ authorId, ticketId, ...data })
    await message.load('author')
    return message
  }

  public async show({ }: HttpContextContract) {
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
