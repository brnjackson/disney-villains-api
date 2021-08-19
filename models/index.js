const Sequelize = require('sequelize')
const teams = require('./villains')

const connection = new Sequelize('disney', 'cruellaDevil', 'd!sNeY', {
  host: 'localhost', dialect: 'mysql', define: { timestamps: true }
})

const Villains = teams(connection, Sequelize)

module.exports = { Villains }
