import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Get, Update, Delete
  Route.resource('users', 'UsersController').apiOnly().except(['store'])

  Route.get('users/:id/tickets', 'UsersController.showTickets')
}).middleware('auth')
