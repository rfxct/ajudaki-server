import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // Get, Update, Delete
  Route.resource('users', 'UsersController').apiOnly().except(['store'])
}).middleware('auth')

// Create
Route.post('/users', 'UsersController.store')
