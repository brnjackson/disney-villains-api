 const sinon = require('sinon')
 const sinonChai = require('sinon-chai')
 const chai = require('chai')
 const { describe, it, before, beforeEach, afterEach } = require('mocha')
 const { displayAll, returnBySlug, saveNewVillain } = require('../../controllers/villains')
 const { allVillains, singleVillain } = require('../mocks/allVillains')
 const models = require('../../models')

 chai.use(sinonChai)
 const { expect } = chai

 describe('Controllers - villains', () => {
     let stubFindOne
     let sandbox
     let stubSend
     let stubStatusSend
     let stubStatus
     let response
     let stubStatusDotSend
     before(() => {
         sandbox = sinon.createSandbox()
         stubFindOne = sandbox.stub(models.Villains, 'findOne')
         stubSend = sandbox.stub()
         stubStatusSend = sandbox.stub()
         stubStatus = sandbox.stub()
         stubStatusDotSend = sandbox.stub()

         response = {
             send: stubSend,
             sendStatus: stubStatusSend,
             status: stubStatus
         }
     })
     beforeEach(() => {
         stubStatus.returns({ send: stubStatusSend })
     })
     afterEach(() => {
     sandbox.reset()
 })


 describe('teams controllers tests', () => {
    describe('displayAll', () => {
      it('retrieves and displays all villains from disney db using res.send method', async () => {
        // first argument
        const stubFindAll = sinon.stub(models.Villains, 'findAll').returns(allVillains)
        const stubSend = sinon.stub()
        const response = { send: stubSend }
  
        await displayAll({}, response)
  
        expect(stubSend).to.have.been.calledWith(allVillains)
        expect(stubFindAll).to.have.callCount(1)
      })
    })
describe('returnBySlug', () => {
    it('retrieves villain with associated slug', async () => {
        const request = { params: { slug: 'captain-hook'} }

        stubFindOne.returns(singleVillain)
        await returnBySlug(request, response)

        expect(stubFindOne).to.have.been.calledWith({ where: { slug: 'captain-hook' } })

        expect(stubSend).to.have.been.calledWith(singleVillain)
    })
    

    it('returns a 404 when no villain is found', async () => {
      stubFindOne.returns(null)
      const request = { params: { slug: 'not-found' } }
      await returnBySlug(request, response)
      expect(stubFindOne).to.have.been.calledWith({ where: { slug: 'not-found' } })
      expect(stubStatusSend).to.have.been.calledWith(404)
    })
    it('returns a 500 with an error message when the database call throws an error', async () => {
      stubFindOne.throws('ERROR!')
      const request = { params: { slug: 'throw-error' } }
      await returnBySlug(request, response)
      expect(stubFindOne).to.have.been.calledWith({ where: { slug: 'throw-error' } })
      expect(stubStatus).to.have.been.calledWith(500)
      expect(stubStatusSend).to.have.been.calledWith('Unable to retrieve villain, please try again')
    })
  })
  describe('saveNewVillain', () => {
    it('accepts new villain details and saves them a new villain, returns saved entry with 201 status', async () => {
      const request = { body: singleVillain }
      const stubCreate = sinon.stub(models.Villains, 'create').returns(singleVillain)

      await saveNewVillain(request, response)

      expect(stubCreate).to.have.been.calledWith(singleVillain)
      expect(stubStatus).to.have.been.calledWith(201)
      expect(stubStatusSend).to.have.been.calledWith(singleVillain)
    })

  })
})
  })

