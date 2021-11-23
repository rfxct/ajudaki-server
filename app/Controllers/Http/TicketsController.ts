import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RankException from 'App/Exceptions/RankException'
import Ticket from 'App/Models/Ticket'
import CreateTicket from 'App/Validators/CreateTicketValidator'

export default class TicketsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10

    const tickets = await Ticket.query()
      .preload('creator')
      .preload('helper')
      .paginate(page, limit)

    return tickets
  }

  public async store({ auth, request }: HttpContextContract) {
    await request.validate(CreateTicket)
    const data = request.only(['subject', 'description'])
    const createdBy = auth.use('api').user?.id

    return await Ticket.create({ createdBy, ...data })
  }

  public async show({ auth, params: { id } }: HttpContextContract) {
    const targetId = auth.use('api').user!.id

    const ticket = await Ticket.findOrFail(id)
    await ticket.load('creator')
    await ticket.load('helper')
    await ticket.load('messages', builder => builder.preload('author'))

    if (
      ticket.status === 'em curso' &&
      ![ticket.createdBy, ticket.assignedTo].includes(targetId)
    ) throw new RankException('Você não possui permissão para visualizar este ticket', 403, 'E_ACCES_DENIED')

    return ticket
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
