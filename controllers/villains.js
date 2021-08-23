const models = require('../models')


const serverSetup = (req, res) => {
  return res.send('Get ready to meet our villains!')
}

const displayAll = async (req, res) => {
  const villains = await models.Villains.findAll()

  return res.send(villains)
}

const returnBySlug = async (req, res) => {
  const { slug } = req.params
  const returnBySlug = await models.Villains.findAll({ where: { slug } })

  return res.send(returnBySlug)
}

const postRequest = async (req, res) => {
  const { name, movie, slug } = req.body

  if (!name || !movie || !slug) {
    return res
      .status(400)
      .send('missing fields')
  }

  const newVillain = await models.Villains.create({ name, movie, slug })

  res.send(newVillain)
}
const errorAll = (req, res) => {
  return res.status(404).send('OOPS')
}


module.exports = {
  serverSetup, displayAll, returnBySlug, postRequest, errorAll
}
