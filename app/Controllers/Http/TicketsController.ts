import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CommonException from 'App/Exceptions/CommonException'
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

    if (
      ticket.status === 'em curso' &&
      ![ticket.createdBy, ticket.assignedTo].includes(targetId)
    ) throw new RankException('Você não possui permissão para visualizar este ticket', 403, 'E_ACCES_DENIED')

    return ticket
  }

  public async acceptTicket({ auth, params: { id: ticketId } }: HttpContextContract) {
    const targetId = auth.use('api').user!.id

    const alreadyAccepted = await Ticket.query()
      .where('id', ticketId)
      .whereRaw('assigned_to IS NOT NULL')
      .first()
    if (alreadyAccepted) throw new CommonException('Esse ticket já foi atribuido a outro ajudante', 403, 'E_ALREADY_ACCEPTED')

    await Ticket.query()
      .where('id', ticketId)
      .whereRaw('assigned_to IS NULL')
      .update({ assigned_to: targetId })

    const ticket = await Ticket.query()
      .where('id', ticketId)
      .andWhere('assigned_to', targetId)
      .preload('creator')
      .preload('helper')
      .first()
    if (!ticket) throw new CommonException('Ocorreu um erro ao atribuir o ticket')

    return ticket
  }

  public async finishTicket({ auth, params: { id: ticketId } }: HttpContextContract) {
    const targetId = auth.use('api').user!.id

    await Ticket.query()
      .whereRaw('id = :ticketId AND (created_by = :targetId OR assigned_to = :targetId)', { targetId, ticketId })
      .update({ finished: true })

    const ticket = await Ticket.findOrFail(ticketId)
    await ticket.load('creator')
    await ticket.load('helper')

    if (
      ![ticket.createdBy, ticket.assignedTo].includes(targetId)
    ) throw new RankException('Você não possui permissão para finalizar este ticket', 403, 'E_ACCES_DENIED')

    return ticket
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
