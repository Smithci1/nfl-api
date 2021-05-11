# NFL API

## Instructions
In the initial commit to this project, you have been provided data about NFL teams. Over the course of the next couple of classes we will use this data to build up a REST API. These exercises will be completed in class.

### Part One
//In a branch called `part-one-answer`, you are tasked with creating an Express server capable of responding to the following routes:

* GET /teams - Return the full list of teams
* GET /teams/ID - Returns the team associated with that ID, where ID is a number (ex. `/teams/12`)

### Part Two
In a new branch called `part-two-answer`, continuing from Part One, you are tasked with creating a handler for the following route:

* POST /teams - Create a new team from the data provided and respond with the newly created team, should error if all fields are not provided

#### Part Two Extra Credit
Update your POST /teams route so that the user does not provide the ID and instead your code determines the next ID in line and uses that for the team being created.

### Part Three
In a new branch called `part-three-answer`, continuing from Part Two, you are tasked with creating a `teams.sql` file which contains the SQL code necessary to create a database called `nfl` with a table called `teams` which contains all of the teams in the `teams.js` file. Examine the data carefully before creating the design of your table.

### Part Four
In a new branch called `part-four-answer`, continuing from Part Three, you are tasked with updating all of your routes to utilize your model instead of the `teams.js` data file. When you are done with your updates, you should no longer need to import the `teams.js` data file in any of your code. Do NOT delete the file.

### Part Five
-In a new branch called `part-five-answer`,
 -continuing from Part Four,
  -you are tasked with creating unit tests for each of your controllers.
  - Your tests should stub out any database calls made by your controllers.

### Part Six
In a new branch called `part-six-answer`, continuing from Part Five, you are tasked with refactoring your code for robustness and DRYness. Utilize what you have learned about sandboxes, try/catch, beforeEach, and afterEach to make your code better.
const teams = require('../teams.js')
const models = require('../models')

const getAllTeams = async (req, res) => {
   const teams = await models.teams.findAll().then( => {
       return res.send(teams)
   })
}
const getTeam = async (req, res) => {

  const team = await models.teams.findOne({where: {id: req.params.id}
})

  return res.send(team)
}
const addNewTeam = (req, res) => {
  const {
    id, location, mascot,
    abbreviation, conference, division
  } = req.body

  if (!id || !location || !mascot ||
     !abbreviation || !conference || !division) {
    return res.status(400)
      .send('missing one or more criteria')
  }
  const newTeam = {
    id,
    location,
    mascot,
    abbreviation,
    conference,
    division
  }

  teams.push(newTeam)

  return res.status(201)
    .send(newTeam)
}
module.exports = {
  getAllTeams,
  getTeam,
  addNewTeam
}
/-------------
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const models = require('../../models')
const { getAllTeams, getTeamById, saveNewTeam } = require('../../controller/teams')
const { mockTeams, singleId } = require('../mocks/mockTeams')



chai.use(sinonChai)
const { expect } = chai

describe('controller - teams', () => {
  describe('getAllTeams', () => {
    it('retrieves a list of teams from the database and calls response.send() with the list ', async () => {
      const stubbedFindAll = sinon.stub(models.teams, 'findAll').returns(mocdkTeams)
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

