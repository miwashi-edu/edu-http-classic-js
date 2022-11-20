const express = require('express')
var favicon = require('serve-favicon')
var path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static('public'))

app.listen(PORT, console.log(`http server listening on port ${PORT}`))