const supertest = require('supertest')

const { initDb } = require('../helpers/initDb')
const server = require('../../server')

describe('/signup', () => {
  beforeEach(async () => {
    await initDb()
  })

  it('should be able to signup and login', async () => {
    const response = await supertest(server)
      .post('/signup')
      .send({
        email: 'test@ace.com',
        password: 'hahahahaha'
      })
    expect(response.status).toEqual(200)
    expect(response.body.email).toEqual('test@ace.com')
  })
})
