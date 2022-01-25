/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/
import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import './user'
import './api/v1'
import './api/v2'
import './api/v3'
import './auth'

Route.get('/', 'PagesController.index')
Route.get('/dev', async ({ view }: HttpContextContract) => {
  return await view.render('pages/dev')
})
Route.get('/endpoints', async ({ response }) => {
  response.ok(Route.toJSON())
})
Route.get('/newimage', 'PagesController.newImage').middleware('auth')
Route.get('/login', 'PagesController.loginPage').middleware('guest')
Route.get('/signup', 'PagesController.signupPage').middleware('guest')

Route.get('/test', 'TestingsController.index')
Route.get('/goodbye', 'PagesController.goodbye')
