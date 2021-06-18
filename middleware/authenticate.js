const authenticate = (login, password) => {
  return login.length > 0 && login.includes('@') && password.length > 5
}

module.exports = authenticate
