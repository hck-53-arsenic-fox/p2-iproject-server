let errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: err.errors[0].message })
  } else {
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = errorHandler;