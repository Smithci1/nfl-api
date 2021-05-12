const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { before, afterEach, describe, it } = require('mocha')
const models = require('../../models')
const { getAllTeams, getTeamById, saveNewTeam } = require('../../controller/teams')
const { mockTeams, singleId } = require('../mocks/mockTeams')






chai.use(sinonChai)
const { expect } = chai


describe('controller - teams', () => {
  let stubbedFindOne

  before(() => {
    stubbedFindOne = sinon.stub(models.teams, 'findOne')
  })

  afterEach(() => {
    stubbedFindOne.resetBehavior()
  })
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
      stubbedFindOne.returns(singleId)
      const request = { params: { id: 31 } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }


      await getTeamById(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 31 } })
      expect(stubbedSend).to.have.been.calledWith(singleId)
    })
    it('returns a 404 status code when no team is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { id: 'not-Found' } }
      const stubbedSendStatus = sinon.stub()
      const response = { sendStatus: stubbedSendStatus }

      await getTeamById(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 'not-Found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
    it('returns a 500 with an error message when database call throws an error', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { id: 'throw-error' } }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }




      await getTeamById(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 'throw-error' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedSend).to.have.been.calledWith('unable to retrieve team try again')
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







