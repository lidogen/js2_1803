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

/*
let readFile = '';
let newObj = {
    "id_product": 890,
    "product_name": "Монитор",
    "price": 19200
  };
fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
    if(!err) {
        let arr = JSON.parse(data)
        arr.push(newObj)
        writeTo(JSON.stringify(arr, null, ' '),'./server/db/catalog.json')
            //readFile = data
            //console.log(readFile)
    } else {
        console.log('error')
    }
}); 
 
setTimeout(() => {
    console.log(readFile)
}, 1000)

function writeTo(obj, file) {
  fs.writeFile(file, obj, (err) => {
        if(err) {
            console.log('Error write file')
        }
       
    })
}
*/ 