console.log('Server is up and running..')

let fs = require('fs')
let express = require('express')

let server = express()

server.use(express.json())

// server.get('/', (reqeust, response) => {
//     response.send('We are online!')
// })

let catalogDB = './server/db/catalog.json'

server.get('/catalog', (req, res) => {
    fs.readFile(catalogDB, 'utf-8', (err,data) => {
        if (!err) {
            res.send(data)
        }
    })
})

server.listen(8080, () => {console.log('Server listening at port 8080..')})

// let newObj =     {
//     "id_product": 5,
//     "product_name": "SSD",
//     "price": 700
//   }

// let readFile = ''

// fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
//     if (!err) {
//         //readFile = data
//         let arr = JSON.parse(data)
//         arr.push(newObj)
//         writeTo(JSON.stringify(arr, null, ' '), './server/db/catalog.json')
//     } else {
//         console.log('ERROR READING FILE!')
//     }
// })

// function writeTo (obj, file) {
//     fs.writeFile(file, obj, (err) => {
//         if(err) {
//         console.log('ERROR WRITING TO FILE!')
//         }
//     })
// }


// setTimeout(() => {
//     console.log(readFile)
// }, 1000)