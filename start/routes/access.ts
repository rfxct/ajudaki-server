import Route from '@ioc:Adonis/Core/Route'
import LoginValidator from 'App/Validators/LoginValidator'

// Access
Route.group(() => {
  // Login
  Route.post('/login', async ({ auth, request }) => {
    await request.validate(LoginValidator)

    const { email, password } = await request.only(['email', 'password'])
    return (await auth.use('api').attempt(email, password))
  })

  // Logout
  Route.post('/logout', async ({ auth }) => {
    await auth.use('api').revoke()
    return { success: auth.isLoggedOut }
  }).middleware('auth')
}).prefix('/access')
