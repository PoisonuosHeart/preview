const { Router } = require('express')
const router = Router()
const config = require('config')
const User = require('../models/User') // Модель пользователя
const bcrypt = require('bcryptjs') // Шифрование пароля
const { check, validationResult } = require('express-validator') // Валидация
const jwt = require('jsonwebtoken') // Авторизация

// Регистрация
router.post(
  '/register',
  [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Неподходящий пароль').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      // Проверка корректности введенных данных
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные при регистрации',
        })
      }
      const { email, password } = req.body
      // Пользователь есть в БД?
      const candidate = await User.findOne({ email: email })

      if (candidate) {
        return res.status(400).json({ message: 'Пользователь уже существует' })
      }
      // Шифруем пароль
      const hashedPassword = await bcrypt.hash(password, 7)
      // Добавить пользователя в БД
      var user = new User({ email, password: hashedPassword })
      await user.save((err) => {
        if (err) {
          return handleError(err)
        }
      })

      res.status(201).json({ message: 'Пользователь успешно создан' }) // ?? Редирект или что
    } catch (e) {
      res.status(500).json({ message: 'Что-то не так, попробуй снова' })
    }
  },
)

// Вход
router.post(
  '/login',
  [
    check('email', 'Введен некорректный email').normalizeEmail().isEmail(),
    check('password', 'Введен некорректный пароль').exists(),
  ],
  async (req, res) => {
    try {
      // Проверка корректности введенных данных
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные при входе',
        })
      }
      const { email, password } = req.body
      // Пользователь есть в БД?
      var user = await User.findOne({ email: email })

      if (!user) {
        return res.status(400).json({ message: 'Пользователя не существует' })
      }

      var validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: 'Неверный пароль' })
      }

      // Получить токен авторизации
      const token = jwt.sign({ userId: user._id }, config.get('secret'), {
        expiresIn: '1h',
      })

      res.json({ token, userId: user._id })
    } catch (e) {
      console.log('mes: ', e.message)
      res.status(500).json({ message: 'Что-то не так, попробуй снова' })
    }
  },
)

module.exports = router
