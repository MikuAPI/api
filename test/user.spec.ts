import test from 'japa'
import User from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route'
import supertest from 'supertest'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const EMAIL = 'hatsune.miku@piapro.net'
const PASSWORD = '123456789'

test.group('User Route Tester', (group) => {
  /**
   * Setup database for the tests.
   */
  group.before(async () => {
    await Database.beginGlobalTransaction()
  })

  /**
   * Clean up database after the tests.
   */
  group.after(async () => {
    await Database.rollbackGlobalTransaction()
  })

  /**
   * Run tests.
   */
  // TODO: Work in progress, must be done
  test('Create an user', async (assert) => {
    /**
     * Create the user through a POST request.
     */
    await supertest(BASE_URL).post('/user/create').set('Accept', 'application/json').send({
      name: 'Hatsune Miku',
      email: EMAIL,
      password: PASSWORD,
    })

    /**
     * Check if the user is created in the database and ensure it's existence.
     */
    const myUser = await User.firstOrFail()
    assert.exists(myUser)
  })

  test('User upload an image', async (assert) => {
    /**
     * TODO: Adjustments must be done here.
     */
    const ctx = await supertest(BASE_URL).get('/auth/me')
    // .set('Accept', 'application/json')
    // .attach('image', './test/assets/image_upload_test.png')
    // .field('author', 'FaySmash')
    // .field(
    //   'source',
    //   'https://www.deviantart.com/faysmash/art/Hatsune-Miku-silhouette-SVGs-PNGs-822110687'
    // )
    console.log(ctx.body)
  })

  test('Delete an user', async (assert) => {
    /**
     * Find & delete, and ensure the user does not exist anymore.
     */
    const user = await User.firstOrFail()
    await user.delete()
    assert.notExists(await User.findBy('email', 'hatsune.miku@piapro.net'))
  })
})
