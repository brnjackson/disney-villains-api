/* eslint-disable no-console */
const express = require('express')
const app = express()
const {
  serverSetup, displayAll, returnBySlug, errorAll, saveNewVillain
} = require('./controllers/villains')


app.get('/', serverSetup)

app.use(express.json())

app.get('/villains', displayAll)

app.get('/villains/:slug', returnBySlug)

app.post('/villains', saveNewVillain)

app.all('*', errorAll)

app.listen(1337, () => {
  console.log('now were cooking!')
})
