/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining users related routes.
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/user/login', 'AuthController.authenticate').middleware('guest')

Route.get('/user/:id', 'UsersController.getUserInformation').where('id', Route.matchers.number())
Route.post('/user/create', 'UsersController.createUser').middleware('guest')
Route.post('/user/requestdeletion', 'UsersController.requestDeletion').middleware('auth')
Route.get('/user/delete', 'UsersController.deleteUser').middleware([
  'auth',
  'requireValidSignature',
])
