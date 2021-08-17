/* eslint-disable no-console */
const express = require('express')
const app = express()
const villains = require('./villains')
const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'stack1263',
  database: 'disney'
})

app.get('/', (req, res) => {
  return res.send('Get ready to meet our villains!')
})
connection.connect()
app.use(express.json())
// return all villains
/* app.get('/villains', (req, res) => {
  return res.send({ villains })
})*/

app.get('/villains', async (req, res) => {
  let sql = 'SELECT * FROM villains'

  let dbVillains = await connection.promise().query(sql)

  return res.send(dbVillains[0])
})
// return villains whos names match the request
app.get('/villains/:slug', (req, res) => {
  const villainsSlug = villains.filter(villain => villain.slug.toLowerCase().includes(req.params.slug.toLowerCase()))

  return res.send(villainsSlug)
})
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

app.post('/villains', async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response
      .status(400)
      .send('missing fields') }

  const sqlInsert = `INSERT INTO villains (name, movie, slug) VALUES ('${name}', '${movie}', '${slug}');`

  await connection.promise().query(sqlInsert)

  let id = await connection.promise().query('SELECT LAST_INSERT_ID()')

  // extract embeded id, as its embeded in arrays and objects
  id = id[0][0]['LAST_INSERT_ID()']

  const sqlSelect = `SELECT * FROM villains WHERE id = '${id}'`

  let dbSelect = await connection.promise().query(sqlSelect)

  return response.status(201).send(dbSelect[0])
})


// return error if req.params does not exist in the villains array
app.all('*', (req, res) => {
  return res.status(404).send('OOPS')
})

app.listen(1337, () => {
  console.log('now were cooking!')
})
