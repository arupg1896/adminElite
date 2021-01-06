const winston = require('winston')
const config = require('../config')

const myformat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
)

const transports = []
if (process.env.NODE_ENV !== 'development') {
  transports.push(
    new winston.transports.Console({
      format: myformat
    })
  )
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli(), winston.format.splat())
    })
  )
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  format: myformat,
  transports
})

module.exports = LoggerInstance
