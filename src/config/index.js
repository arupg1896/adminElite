const dotenv = require('dotenv')
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const envFound = dotenv.config()

if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

module.exports = {
/**
   * Your favorite port
**/
  port: parseInt(process.env.PORT, 10),

  /**
 * Used by winston logger
**/
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },

  /**
 * Used by api prefix
**/

  api: {
    prefix: '/api'
  },

  /**
       * That long string from mlab
    **/
  databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET

}
