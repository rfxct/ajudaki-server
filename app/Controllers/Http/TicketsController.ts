import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ticket from 'App/Models/Ticket'
import CreateTicket from 'App/Validators/CreateTicketValidator'

export default class TicketsController {
  public async index ({}: HttpContextContract) {
    const data = await Ticket.find(1)
    console.log(data)
    return data
  }

  public async store ({ auth, request }: HttpContextContract) {
    await request.validate(CreateTicket)
    const data = request.only(['subject', 'description'])
    const createdBy = auth.use('api').user?.id

    return await Ticket.create({ createdBy, ...data })
  }

  public async show ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
