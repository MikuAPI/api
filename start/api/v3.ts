import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/random', 'v3/ImagesController.')
}).prefix('/api/v3')
