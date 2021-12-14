import test from 'japa'
import User from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User Route Tester', () => {
  // TODO: Work in progress, must be done
  test('Create an user', async (assert) => {
    const ctx = await supertest(BASE_URL)
      .post('/user/create')
      .set('Accept', 'application/json')
      .send({
        name: 'Hatsune Miku',
        email: 'hatsune.miku@piapro.net',
        password: '123456789',
      })
      .expect(200)
    assert.hasAllKeys(ctx.body, ['id', 'name', 'email', 'created_at', 'updated_at'])
  })

  test('User upload an image', async (assert) => {
    const ctx = await supertest(BASE_URL)
      .post('/api/v3/upload')
      .set('Accept', 'application/json')
      .attach('image', './test/assets/image_upload_test.png')
      .field('author', 'FaySmash')
      .field('source', 'https://www.deviantart.com/faysmash/art/Hatsune-Miku-silhouette-SVGs-PNGs-822110687')
    console.log(ctx.body)
  })

  test('Delete an user', async (assert) => {
    const user = (await User.findBy('email', 'hatsune.miku@piapro.net'))!
    const route = Route.builder()
      .qs({ email: user.email })
      .makeSigned('DeletionRequestsController.deleteAccount')
    const ctx = await supertest(BASE_URL).get(route).expect(202)
    assert.isNull(await User.findBy('email', 'hatsune.miku@piapro.net'))
  })
})
