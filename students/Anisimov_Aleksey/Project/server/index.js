let fs = require('fs')
let express = require('express')

let server = express()

server.use(express.json())

server.listen(8080, () => {console.log('server run on 8080')})

//server.get('/')
// let readFile = fs.readFile('./db/catalog.json', 'utf-8', (err,data) => {
//     if (!err) {
//         readFile = data
//         console.log(readFile);
//     } else {
//         console.log(err);
        
//     }
// })