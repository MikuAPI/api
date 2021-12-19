/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining users related routes.
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.group(() => {
//   Route.get('/dashboard', () => {
//     return 'Work in progress.'
//   })
//   Route.post('/create', 'UsersController.requestUserCreation').middleware('guest')
//   Route.post('/verify', 'UsersController.verifyUser')
//   Route.get('/delete', 'DeletionRequestsController.deleteAccount').middleware([
//     'requireValidSignature',
//   ])
// }).prefix('/user')

Route.resource('/api/user', 'UsersController').apiOnly()
