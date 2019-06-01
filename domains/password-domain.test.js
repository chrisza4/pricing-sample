const PasswordDomain = require('./password-domain')

describe('Password', () => {
  it('Should be able to encrypt and decrpyt', () => {
    const p1 = PasswordDomain.encryptPassword('password1')
    const p2 = PasswordDomain.encryptPassword('password2')
    expect(p1).not.toEqual('password1')
    expect(p2).not.toEqual('password2')
    expect(p1).not.toEqual(p2)

    const valid1 = PasswordDomain.validatePassword(p1, 'password1')
    const valid2 = PasswordDomain.validatePassword(p2, 'password2')
    const invalid = PasswordDomain.validatePassword(p1, 'aaaa')
    expect(valid1).toBeTruthy()
    expect(valid2).toBeTruthy()
    expect(invalid).toBeFalsy()
  })
})
