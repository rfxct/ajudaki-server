import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RankException from 'App/Exceptions/RankException'
import Ticket from 'App/Models/Ticket'
import TicketMessage from 'App/Models/TicketMessage'
import CreateTicketMessage from 'App/Validators/CreateTicketMessageValidator'

export default class TicketMessagesController {
  public async index({ auth, params: { ticketId } }: HttpContextContract) {
    const targetId = auth.use('api').user!.id

    const ticket = await Ticket.findOrFail(ticketId)
    await ticket.load('messages', builder => builder.preload('author'))

    if (
      ticket.status === 'em curso' &&
      ![ticket.createdBy, ticket.assignedTo].includes(targetId)
    ) throw new RankException('Você não possui permissão para visualizar este ticket', 403, 'E_ACCES_DENIED')

    return ticket.messages.sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis())
  }

  public async store({ auth, request, params: { ticketId } }: HttpContextContract) {
    await request.validate(CreateTicketMessage)
    const data = request.only(['content'])
    const authorId = auth.use('api').user!.id

    const parentTicket = await Ticket.query()
      .whereRaw('(created_by = :authorId OR assigned_to = :authorId) AND id = :ticketId', {
        authorId, ticketId
      }).first()

    if (!parentTicket) throw new RankException(
      `Você não possui permissão para acessar o ticket de id ${ticketId}`, 403, 'E_ACCES_DENIED'
    )

    const message = await TicketMessage.create({ authorId, ticketId, ...data })
    await message.load('author')

    return message
  }
}
