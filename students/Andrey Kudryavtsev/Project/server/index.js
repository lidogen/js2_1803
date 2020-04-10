let fs = require('fs')

let express = require('express')

let server = express()

let catalogDB = './server/db/catalog.json'

server.use(express.json())

server.get('/catalog', (req, res) => {
    fs.readFile(catalogDB, 'utf-8', (err, data) => {
        if(!err) {
            res.send(data)
        }
    })
})

server.listen(8080, () => { console.log('server listen @ 8080...') })
