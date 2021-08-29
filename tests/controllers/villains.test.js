 const sinon = require('sinon')
 const sinonChai = require('sinon-chai')
 const chai = require('chai')
 const { describe, it } = require('mocha')
 const { displayAll, returnBySlug } = require('../controllers/villains')
 const { allVillains, singleVillain } = require('../mocks/allVillains')
 const models = require('../../models')

 chai.use(sinonChai)
 const { expect } = chai
 