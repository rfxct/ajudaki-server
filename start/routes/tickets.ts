import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Get, Create, Update, Delete
  Route.resource('tickets', 'TicketsController').apiOnly()
  Route.resource('tickets/:ticketId/messages', 'TicketMessagesController').apiOnly()
}).middleware('auth')
