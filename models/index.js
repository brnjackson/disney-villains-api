const Sequelize = require('sequelize')
const villains = require('./villains')

const connection = new Sequelize('disney', 'cruellaDevil', 'd!sNeY', {
  host: 'localhost', dialect: 'mysql', define: { timestamps: true }
})

const Villains = villains(connection, Sequelize)

module.exports = { Villains }
