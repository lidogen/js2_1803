const fs = require('fs')
const path = require('path')
const express = require('express')

let server = express()
let catalogDB = 'server/db/catalog.json'
let cartDB = 'server/db/cart.json'

server.use(express.json())
//console.log(path.resolve())



server.get('/catalog', (err, res) => {
    fs.readFile(catalogDB, 'utf-8', (err,data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log('Ахтунг ' + err)
        }
    })
})

server.get('/cart', (err, res) => {
    fs.readFile(cartDB, 'utf-8', (err,data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log('Ахтунг ' + err)
        }
    })
})

server.listen(8080, () => {console.log('server run on 8080')})