'use strict'

const path = require('path')
const search = require('./search')

const express = require('express')
const app = express()


// handle search requests
app.get('/api/search', search)


// serve static content
app.use(express.static(
  path.join(__dirname, '../../public')
))


// start server
app.listen(/*process.env.PORT*/3000, () => {
  console.log('server started')
})
