import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User Route Tester', () => {
  // TODO: Work in progress, must be done
  test('Create an user', async (assert) => {
    const ctx = await supertest(BASE_URL).post('/user/create').set('Accept', 'application/json')
    console.log(ctx)
    assert.equal(2 + 2, 4)
  })
})
