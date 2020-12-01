const app = require('express')();
const server = require('http').createServer(app);
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.json())
app.use(methodOverride())


let tasks = []

app.get('/tasks', (req, res) => {
    res.json(tasks)
})
app.post('/tasks', (req, res) => {
    let task = req.body.name
    let time = req.body.time
    let timefinish = req.body.timefinish

    if (task && time && timefinish) {
        tasks.push(req.body);
        res.json(tasks)
    } else {
        res.send('Oh Mixizi bug la')
    }
})
app.get('/tasks/:id(\\d+)', (req, res) => {
    let task = tasks[req.params.id-1]
    if (task != null) {
        res.status(200).json({
            status: 200,
            data: task
        })
    } else {
        res.status(404).json({
            status: 404,
            error: "L'utilisateur n'existe pas."
        })
    }
})
app.delete('/tasks/:id(\\d+)', (req, res) =>{
    if(tasks[req.params.id-1]){
        tasks.splice(req.params.id-1,1)
        res.json(tasks)
    }else  {
        res.send('il existe pas zebi')
    }
})
app.put('/tasks/:id(\\d+)', (req, res) => {
    if(tasks[req.params.id-1] && req.body.name && req.body.time && req.body.timefinish){
        tasks[req.params.id-1] = req.body
        res.json(tasks[req.params.id-1])
    }else {
        res.send("OMG TU FAIS QUOI LA ?")
    }
})
server.listen(3000);

// => /tasks avec la methode GET
