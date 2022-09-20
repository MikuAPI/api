import Route from '@ioc:Adonis/Core/Route'

Route.resource('v3/images', 'v3/ImagesController').as('images').apiOnly().middleware({
})
