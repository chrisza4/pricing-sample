const supertest = require('supertest')

const { initDb } = require('../helpers/initDb')
const server = require('../../server')

describe('/signup', () => {
  beforeEach(async () => {
    await initDb()
  })

  it('should be able to signup', async () => {
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

describe('/login', () => {
  beforeEach(async () => {
    await initDb()
    await supertest(server)
      .post('/signup')
      .send({
        email: 'test@ace.com',
        password: 'hahahahaha'
      })
  })

  it('should be able to login and get token if username and password is correct', async () => {
    const response = await supertest(server)
      .post('/login')
      .send({
        email: 'test@ace.com',
        password: 'hahahahaha'
      })
    expect(response.status).toEqual(200)
    expect(response.body.token).toBeDefined()
  })

  it('should not be able to login and get token if username and password is correct', async () => {
    const response = await supertest(server)
      .post('/login')
      .send({
        email: 'tesat@ace.com',
        password: 'hahahahaha'
      })
    expect(response.status).toEqual(200)
    expect(response.body.success).toBeFalsy()
  })
})
