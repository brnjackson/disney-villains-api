const models = require('../models')


const serverSetup = (req, res) => {
  return res.send('Get ready to meet our villains!')
}
const displayAll = async (req, res) => {
  const villains = await models.Villains.findAll()

  return res.send(villains)
}

const returnBySlug = async (req, res) => {
  try { 
        const { slug } = req.params

  const matchingSlug = await models.Villains.findOne({ where: { slug } })

  return matchingSlug
    ? res.send(matchingSlug)
    : res.sendStatus(404)
} catch (error) {
    return res.status(500).send('Unable to retrieve villain, please try again')
}
}


const saveNewVillain = async (req, res) => {
  const { name, movie, slug } = req.body

  if (!name || !movie || !slug) {
    return res
      .status(400)
      .send('missing fields. name, movie and slug required.')
  }

  const newVillain = await models.Villains.create({ name, movie, slug })

  return res.status(201).send(newVillain)
}
const errorAll = (req, res) => {
  return res.status(404).send('OOPS')
}


module.exports = {
  serverSetup, displayAll, returnBySlug, saveNewVillain, errorAll
}
