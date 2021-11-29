/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining users related routes.
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/dashboard', () => {
    return 'Work in progress.'
  })
  Route.post('/create', 'UsersController.requestUserCreation').middleware('guest')
  Route.post('/requestdeletion', 'DeletionRequestsController.requestDeletion').middleware('auth')
  Route.get('/delete', 'DeletionRequestsController.deleteAccount').middleware(['auth', 'requireValidSignature'])
}).prefix('/user')
