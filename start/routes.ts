import Route from '@ioc:Adonis/Core/Route'

// import './routes/tickets'

Route.group(() => {
  // Authentication
  Route.group(() => {
    Route.post('login', 'AuthController.login')
    Route.post('register', 'UsersController.store')
    Route.post('logout', 'AuthController.logout').middleware('auth')
  }).prefix('access')


  // Users
  Route.group(() => {
    // Get, Update, Delete
    Route.resource('users', 'UsersController').apiOnly().except(['store', 'index'])

    Route.resource('tickets', 'TicketsController').apiOnly()

    Route.get('users/:id/tickets', 'UsersController.showTickets')
    Route.get('users/:id/profile', 'UsersController.profile')
  }).middleware('auth').middleware('rank,helper')
}).prefix('api')
