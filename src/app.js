const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const config = require('./config')
const Logger = require('./loaders/logger')
const indexRouter = require('./routes/index')
const userRoutes = require('./routes/users')
const bodyParser = require('body-parser')

const app = express()
// For Initialize api start
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())
// For Initialize api end
// Load all router start
app.use(config.api.prefix, userRoutes)
app.use('/', indexRouter)

// Load all router end

mongoose.connect(config.databaseURL, { useNewUrlParser: true })
const db = mongoose.connection

// Added check for DB connection
if (!db) {
  Logger.info('Error connecting db')
} else {
  Logger.info('Db connected successfully')
}

// Start For view enging loaded attribute
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// eslint-disable-next-line node/no-path-concat
app.use(express.static(__dirname + '/public'))
// eslint-disable-next-line node/no-path-concat
app.use(express.static(__dirname + '/assets'))
// eslint-disable-next-line node/no-path-concat
app.use(express.static(__dirname + '/uploads'))

app.use(cookieParser())
app.use(cors())

// End For view enging loaded attribute

app.listen(config.port, err => {
  if (err) {
    Logger.error(err)
    process.exit(1)
  } else {
    Logger.info(`
            ################################################
            🛡️  Server listening on port: ${config.port} 🛡️ 
            ################################################
        `)
  }
})
