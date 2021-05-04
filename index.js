const express = require('express')
const teams = require('./teams.js')
const {getAllTeams, getTeam, addNewTeam} = require('./controller/teams')
const bodyParser = require('body-parser')
const app = express()

app.get('/teams', getAllTeams)
app.get('/teams/:id',getTeam) 
app.use(express.json())
app.post('/teams', addNewTeam)
app.all('*', (req,res) => {
    return res.sendStatus(404)
})

app.listen(3370, () => {
    console.log('listening on 3370...')
})