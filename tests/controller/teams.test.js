const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { before, afterEach, describe, it } = require('mocha')
const models = require('../../models')
const { getAllTeams, getTeamById, saveNewTeam } = require('../../controller/teams')
const { mockTeams, singleId } = require('../mocks/mockTeams')




chai.use(sinonChai)
const { expect } = chai

describe('Controllers - teams', () => {
  let stubbedFindOne

  before(() => {
    stubbedFindOne.resetBehavior()
  })
})

describe('controller - teams', () => {
  describe('getAllTeams', () => {
    it('retrieves a list of teams from the database and calls response.send() with the list ', async () => {
      const stubbedFindAll = sinon.stub(models.teams, 'findAll').returns(mockTeams)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllTeams({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(mockTeams)
    })
  })

  describe('getTeambyId', () => {
    it('retrieves team associated with the provided ID form the database and calls response.send()', async () => {
      const request = { params: { id: 31 } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }
      const stubbedFindOne = sinon.stub(models.teams, 'findOne').returns(singleId)

      await getTeamById(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 31 } })
      expect(stubbedSend).to.have.been.calledWith(singleId)
    })
  })

  describe('saveNewTeam', () => {
    it('accepts new hero details and saves them as a new hero, returning the saved record with a 201 status',
      async () => {
        const request = { body: singleId }
        const stubbedSend = sinon.stub()
        const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
        const response = { status: stubbedStatus }
        const stubbedCreate = sinon.stub(models.teams, 'create').returns(singleId)

        await saveNewTeam(request, response)

        expect(stubbedCreate).to.have.been.calledWith(singleId)
        expect(stubbedStatus).to.have.been.calledWith(201)
        expect(stubbedSend).to.have.been.calledWith(singleId)
      })
  })
})






