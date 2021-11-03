/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining users related routes.
*/

import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.post('/user/login', 'AuthController.authenticate').middleware('guest')
Route.post('/user/logout', 'AuthController.logout').middleware('auth')

Route.get('/user/:id', 'UsersController.getUserInformation').where('id', Route.matchers.number())
Route.get('/user/whoami', async ({ auth, response }: HttpContextContract) => {
  const user = await auth.authenticate()
  return response.ok(`You are authenticated as ${user.name}.`)
})
Route.post('/user/create', 'UsersController.requestUserCreation').middleware('guest')
Route.post('/user/requestdeletion', 'UsersController.requestDeletion').middleware('auth')
Route.get('/user/delete', 'UsersController.deleteUser').middleware([
  'auth',
  'requireValidSignature',
])
