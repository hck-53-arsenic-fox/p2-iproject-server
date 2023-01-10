let errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: err.errors[0].message })
  } else if (err.name === "EmailRequired") {
    res.status(401).json({ message: 'Email required' })
  } else if (err.name === "PasswordRequired") {
    res.status(401).json({ message: 'Password required' })
  } else if (err.name === 'InvalidCredentials') {
    res.status(401).json({ message: 'Invalid email/password' })
  } else {
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = errorHandler;