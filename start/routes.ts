import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Authentication
  Route.group(() => {
    Route.post('login', 'AuthController.login')
    Route.post('register', 'UsersController.store')
    Route.post('logout', 'AuthController.logout').middleware('auth')
  }).prefix('access')


  // Users
  Route.group(() => {
    Route.group(() => {
      // Get, Update, Delete
      Route.resource('users', 'UsersController').apiOnly().except(['store', 'index', 'destroy'])
      Route.resource('tickets', 'TicketsController').apiOnly().only(['index'])

      // Ticket handlign
      Route.post('tickets/:id/finish', 'TicketsController.finishTicket')
      Route.post('tickets/:id/accept', 'TicketsController.acceptTicket')

      Route.get('users/:id/tickets', 'UsersController.showTickets')
      Route.get('users/:id/tickets/assigned', 'UsersController.showAssignedTickets')
      Route.get('users/:id/profile', 'UsersController.profile')
    }).middleware('rank,helper')

    Route.group(() => {
      Route.resource('users', 'UsersController').apiOnly().only(['destroy'])
    }).middleware('rank,admin')

    Route.resource('tickets/:ticketId/messages', 'TicketMessagesController').apiOnly()
    Route.resource('tickets', 'TicketsController').apiOnly().except(['index'])
  }).middleware('auth')

}).prefix('api')
