const teams = require('../teams.js')

const getAllTeams = (req,res) => {
    return res.send(teams) 
}
const getTeam = (req,res) => {
    const team = teams.find((team) => {
            return team.id === 
            parseInt(req.params.id)})
    return res.send(team)
    }
module.exports = {getAllTeams,
    getTeam
}