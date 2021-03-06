/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining users related routes.
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login').middleware('guest')
  Route.post('/logout', 'AuthController.logout').middleware('auth')
  Route.get('/me', 'AuthController.me')
}).prefix('/auth')
