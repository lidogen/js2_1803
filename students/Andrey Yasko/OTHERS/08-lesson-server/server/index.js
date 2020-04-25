let fs = require('fs');
let express = require('express');
let server = express();

let cart = require('./cart.js')
let catalog = require('./catalog.js')
let catalogDb = './server/db/catalog.json'
let cartDb = './server/db/cart.json'

let writer = require('./writer.js')



server.use(express.json());


server.get('/catalog', (req, res) => {
    fs.readFile(catalogDb, 'utf-8', (err, data) => {
        if(!err) {
            res.send(data)
        }
    })
})
server.get('/cart', (req, res) => {
    fs.readFile(cartDb, 'utf-8', (err, data) => {
        if(!err) {
            res.send(data)
        }
    })
})

server.post('/cart', (req, res) => {
    fs.readFile(cartDb, 'utf-8', (err, data) => {
        if(!err) {
            let newCart = cart.add(JSON.parse(data), req.body)
            writer(cartDb, newCart)
            .then(status => {
                if(status === true) {
                    res.json({status: 1})
                } else {
                    res.sendStatus(500, 'Error write data')
                }
            })
        } else {
            res.sendStatus(404, 'DB catalog not found')
        }
    } )
})
server.post('/catalog', (req, res) => {
    
    fs.readFile(catalogDb, 'utf-8', (err, data) => {
        if(!err) {
            let {newCatalog, _id} = catalog.add(JSON.parse(data), req.body)
            writer(catalogDb, newCatalog)
            .then(status => {
                if(status === true) {
                    res.json({_id})
                } else {
                    res.sendStatus(500, 'Error write data')
                }
            })
        } else {
            res.sendStatus(404, 'DB catalog not found')
        }
    } )
})
server.put('/cart/:id', (req, res) => {
    fs.readFile(cartDb, 'utf-8', (err, data) => {
        if(!err) {
            let newCart = cart.change(JSON.parse(data), req)
            writer(cartDb, newCart)
            .then(status => {
                if(status === true) {
                    res.json({status: 1})
                } else {
                    res.sendStatus(500, 'Error write data')
                }
            })
        } else {
            res.sendStatus(404, 'DB catalog not found')
        }
    } )
})
server.delete('/cart/:id', (req, res) => {
    fs.readFile(cartDb, 'utf-8', (err, data) => {
        if(!err) {
            let newCart = cart.delete(JSON.parse(data), req)
            writer(cartDb, newCart)
            .then(status => {
                if(status === true) {
                    res.json({status: 1})
                } else {
                    res.sendStatus(500, 'Error write data')
                }
            })
        } else {
            res.sendStatus(404, 'DB catalog not found')
        }
    } )
})
server.listen(8080, () => { console.log('Server listen @ port 8080')})