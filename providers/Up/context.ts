// Reference: https://github.com/adonisjs-community/polls-app/tree/main/providers/Up

import Up from './index'

declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    up: Up
  }
}
