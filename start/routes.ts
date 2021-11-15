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

      Route.get('users/:id/tickets', 'UsersController.showTickets')
      Route.get('users/:id/profile', 'UsersController.profile')

      Route.get('tickets/:id/messages', 'TicketMessageController')
    }).middleware('rank,helper')

    Route.resource('tickets', 'TicketsController').apiOnly()
  }).middleware('auth')

}).prefix('api')
