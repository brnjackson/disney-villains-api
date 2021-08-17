/* eslint-disable no-console */
const express = require('express')
const app = express()
const {
  serverSetup, displayAll, returnBySlug,
  postRequest, errorAll
} = require('./controllers/villains')


app.get('/', serverSetup)

app.use(express.json())
// return all villains
/* app.get('/villains', (req, res) => {
  return res.send({ villains })
})*/

app.get('/villains', displayAll)
// return villains whos names match the request
app.get('/villains/:slug', returnBySlug)
// add new villain
/* app.post('/villains', (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.body)

  const { name, movie, slug } = req.body

  // check response body for all fields - if missing fields, return error 400
  if (!name || !movie || !slug) {
    return res.status(400).send('missing fields')
  }

  const now = new Date()

  const newVillain = {
    name: name,
    movie: movie,
    slug: slug,
    updatedAt: now
  }

  // add new villain to existing list of villains
  villains.push(newVillain)

  return res.send(newVillain)
})*/

app.post('/villains', postRequest)


// return error if req.params does not exist in the villains array
app.all('*', errorAll)

app.listen(1337, () => {
  console.log('now were cooking!')
})
