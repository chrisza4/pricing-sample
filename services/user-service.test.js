jest.mock('../data/user-data')
const { mockUser } = require('../test/helpers/fixtures')
const UserService = require('./user-service')
const UserData = require('../data/user-data')

describe('Signup', () => {
  it('Should add user into database and encrypt password', async () => {
    const user = mockUser({ email: 'test@ace.com', password: 'haha' })
    UserData.addUser.mockResolvedValue(user)
    await UserService.signUp(user)

    expect(UserData.addUser.mock.calls[0][0].email).toEqual('test@ace.com')
    expect(UserData.addUser.mock.calls[0][0].password).not.toEqual('haha')
  })
})
