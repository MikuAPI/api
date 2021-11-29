import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.any('/', async ({ response }) => {
    response.gone('This route is deprecated and deleted since v2.')
  })
  Route.any('*', async ({ response }) => {
    response.gone('This route is deprecated and deleted since v2.')
  })
}).prefix('/api/v1')
