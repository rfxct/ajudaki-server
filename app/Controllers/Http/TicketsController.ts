import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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

  public async show({ response, auth, params: { id } }: HttpContextContract) {
    const targetId = auth.use('api').user!.id
    const tickets = await Ticket.query()
      .where('created_by', targetId)
      .orWhere('assigned_to', targetId)
      .preload('creator')
      .preload('helper')
      .preload('messages', builder => builder.preload('author'))

    const ticket = tickets.find(t => t.id === Number(id)) || {}
    if (!Object.keys(ticket).length && auth.use('api').user!.role !== 'admin') return response.status(403).send({
      errors: [{
        message: "E_UNAUTHORIZED_ACCESS: Você não possui permissão para visualizar este ticket"
      }]
    })

    return ticket
  }

  public async update({ }: HttpContextContract) {
  }

  public async destroy({ }: HttpContextContract) {
  }
}
