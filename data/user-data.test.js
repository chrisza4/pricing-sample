const UserData = require('./user-data')
const { mockUser } = require('../test/helpers/fixtures')
const { initDb } = require('../test/helpers/initDb')

describe('User data', () => {
  beforeEach(() => {
    return initDb()
  })

  it('Can add and delete user', async () => {
    const userBeforeExists = await UserData.getByEmail('test@ace.com')
    expect(userBeforeExists).toBeNull()
    const user1 = mockUser({
      email: 'test@ace.com'
    })
    await UserData.addUser(user1)
    const user = await UserData.getByEmail('test@ace.com')
    expect(user.email).toEqual('test@ace.com')
  })
})
