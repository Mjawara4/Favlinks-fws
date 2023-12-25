const { DiffieHellmanGroup } = require('crypto')
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const PORT = 3000
const clientPath = path.resolve(__dirname, '../client/dist')
const db = require('/.db')


app.use(express.static(clientPath))
app.use(cors())

app.get('/api/links', db.getLinks);
app.get('/', (req, res) => {
    // we'll do some stuff here
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'))
})


app.get('/api/links', db.getLinks);
app.post('/api/links', db.createLink);
app.put('/api/links/:id', db.updateLink);
app.delete('/api/links/:id', db.deleteLink);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

