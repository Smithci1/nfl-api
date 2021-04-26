const express = require('express')
const teams = require('./teams.js')
const app = express()

app.get('/teams',(req,res) => {
    return res.send(teams)

})
app.get('/teams/:id', (req,res) => {
    const team = teams.find((team) => {
            return team.id === 
            parseInt(req.params.id)})
    return res.send(team)
})


app.all('*', (req,res) => {
    return res.sendStatus(404)
})

app.listen(3370, () => {
    console.log('listening on 3370...')
})