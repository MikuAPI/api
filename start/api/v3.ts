import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/random', 'v3/ImagesController.random')
  Route.post('/upload', 'v3/ImagesController.store')
  Route.get('/health', 'v3/CoreController.getHealth')
}).prefix('/api/v3')
