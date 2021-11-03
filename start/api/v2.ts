import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/random', 'v2/ImagesController.')
}).prefix('/api/v2')
