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
const addNewTeam = (req,res) => {
        const {id, location, mascot, 
               abbreviation, conference, division} = req.body
           
    if (!id || !location || !mascot
     || !abbreviation || !conference || !division){
         return res.status(400)
         .send('missing one or more criteria')
     } 
    const newTeam =   {id, location, mascot, 
        abbreviation, conference, division}  
    teams.push(newTeam)  
    return res.status(201)
    .send(newTeam)    
} 
module.exports = {getAllTeams,
    getTeam, addNewTeam
}