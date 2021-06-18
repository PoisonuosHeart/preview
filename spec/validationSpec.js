const assert = require('assert').strict
const authenticate = require('../middleware/authenticate')
const register = require('../middleware/register')

describe('Регистрация', () => {
  describe('Тесты, которые должны пройти', () => {
    it('Логин содержит цифры', () => {
      const email = 'mishka123@mail.ru'
      const pass = '123456'
      assert.equal(authenticate(email, pass), true, 'Неверный логин или пароль')
    })

    it('Логин не содержит цифры', () => {
      const email = 'mishka@mail.ru'
      const pass = '123456'
      assert.equal(authenticate(email, pass), true, 'Неверный логин или пароль')
    })
  })

  describe('Тесты, которые должны упасть', () => {
    it('Логин не содержит @', () => {
      const email = 'mishkamail.ru'
      const pass = '123456'
      assert.notEqual(
        authenticate(email, pass),
        true,
        'Неверный логин или пароль',
      )
    })

    it('Пустой логин', () => {
      const email = ''
      const pass = '123456'
      assert.notEqual(
        authenticate(email, pass),
        true,
        'Неверный логин или пароль',
      )
    })

    it('Пустой пароль', () => {
      const email = 'mishka@mail.ru'
      const pass = ''
      assert.notEqual(
        authenticate(email, pass),
        true,
        'Неверный логин или пароль',
      )
    })
  })
})

describe('Аутентификация', () => {
  describe('Тесты которые должны пройти', () => {
    it('пользователь, который есть в базе', () => {
      const email = 'mishka_test@inbox.ru'
      const pass = '123456'
      assert.equal(
        register(email, pass),
        true,
        `email: ${email} password: ${pass}`,
      )
    })
  })

  describe('Тесты которые должны упасть', () => {
    it('пользователь, которого нет в базе', () => {
      const email = 'mishka198765@mail.ru'
      const pass = '123456not'
      assert.equal(
        register(email, pass),
        false,
        `email: ${email} password: ${pass}`,
      )
    })

    it('пользователь, которого нет в базе', () => {
      const email = 'enot@mail.ru'
      const pass = '123456not'
      assert.equal(
        register(email, pass),
        false,
        `email: ${email} password: ${pass}`,
      )
    })
  })
})
