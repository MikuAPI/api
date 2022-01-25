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

// See https://www.notion.so/predeactor/Routes-b1c3f322b1ac4d52be0be72abb9225ec#2953ec3cdbbb4bc4a0518b0785f3835e

Route.group(() => {
  Route.get('/all', 'UsersController.index').middleware('isAdmin')
  Route.get('/:id', 'UsersController.show')
  Route.post('/create', 'UsersController.store')
  Route.post('/update', 'UsersController.update')
  Route.post('/delete', 'UsersController.destroy')
  Route.post('/verify', 'UsersController.verifyUser')
}).prefix('/user')
