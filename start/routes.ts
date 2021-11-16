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
      Route.resource('users', 'UsersController').apiOnly().except(['store', 'index'])
      Route.resource('tickets', 'TicketsController').apiOnly().only(['index'])


      Route.get('users/:id/tickets', 'UsersController.showTickets')
      Route.get('users/:id/profile', 'UsersController.profile')

      Route.resource('tickets/:ticketId/messages', 'TicketMessagesController').apiOnly()
    }).middleware('rank,helper')

    Route.resource('tickets', 'TicketsController').apiOnly().except(['index'])
  }).middleware('auth')

}).prefix('api')
