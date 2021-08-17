const mysql = require('mysql2')
const villains = require('../villains')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'stack1263',
  database: 'disney'
})

connection.connect()

const serverSetup = (req, res) => {
  return res.send('Get ready to meet our villains!')
}

const displayAll = async (req, res) => {
  let sql = 'SELECT * FROM villains'

  let dbVillains = await connection.promise().query(sql)

  return res.send(dbVillains[0])
}

const returnBySlug = (req, res) => {
  const villainsSlug = villains.filter(villain => villain.slug.toLowerCase().includes(req.params.slug.toLowerCase()))

  return res.send(villainsSlug)
}

const postRequest = async (req, res) => {
  const { name, movie, slug } = req.body

  if (!name || !movie || !slug) {
    return res
      .status(400)
      .send('missing fields') }

  const sqlInsert = `INSERT INTO villains (name, movie, slug) VALUES ('${name}', '${movie}', '${slug}');`

  await connection.promise().query(sqlInsert)

  let id = await connection.promise().query('SELECT LAST_INSERT_ID()')

  // extract embeded id, as its embeded in arrays and objects
  id = id[0][0]['LAST_INSERT_ID()']

  const sqlSelect = `SELECT * FROM villains WHERE id = '${id}'`

  let dbSelect = await connection.promise().query(sqlSelect)

  return res.status(201).send(dbSelect[0])
}
const errorAll = (req, res) => {
  return res.status(404).send('OOPS')
}


module.exports = {
  serverSetup, displayAll, returnBySlug, postRequest, errorAll
}
