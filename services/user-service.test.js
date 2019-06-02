jest.mock('../data/user-data')
const { mockUser } = require('../test/helpers/fixtures')
const UserService = require('./user-service')
const UserData = require('../data/user-data')
const PasswordDomain = require('../domains/password-domain')

describe('Signup', () => {
  it('Should add user into database and encrypt password', async () => {
    const user = mockUser({ email: 'test@ace.com', password: 'haha' })
    UserData.addUser.mockResolvedValue(user)
    await UserService.signUp(user)

    expect(UserData.addUser.mock.calls[0][0].email).toEqual('test@ace.com')
    expect(UserData.addUser.mock.calls[0][0].password).not.toEqual('haha')
  })
})

describe('Login', () => {
  it('correct username and password, should be able to login', async () => {
    const password = PasswordDomain.encryptPassword('hahaha')
    const user = mockUser({ email: 'test@ace.com', password })
    UserData.getByEmail.mockResolvedValue(user)
    const loginResult = await UserService.login('test@ace.com', 'hahaha')
    expect(UserData.getByEmail.mock.calls[0][0]).toEqual('test@ace.com')
    expect(loginResult.success).toBeTruthy()
    expect(loginResult.token).toBeDefined()
  })

  it('incorrect password, should not be able to login', async () => {
    const password = PasswordDomain.encryptPassword('hahaha')
    const user = mockUser({ email: 'test@ace.com', password })
    UserData.getByEmail.mockResolvedValue(user)
    const loginResult = await UserService.login('test@ace.com', 'hahahsssa')
    expect(UserData.getByEmail.mock.calls[0][0]).toEqual('test@ace.com')
    expect(loginResult.success).toBeFalsy()
  })

  it('incorrect username, should not be able to login', async () => {
    UserData.getByEmail.mockResolvedValue(null)
    const loginResult = await UserService.login('test2@ace.com', 'hahahsssa')
    expect(UserData.getByEmail.mock.calls[0][0]).toEqual('test@ace.com')
    expect(loginResult.success).toBeFalsy()
  })
})
