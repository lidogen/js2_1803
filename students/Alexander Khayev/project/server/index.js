console.log("Hello, I'm server");

let fs = require('fs')
let express = require('express');

let server = express();
server.use(express.json());

server.get('/', (request, response) => {
  response.send('Hello "Teapot" :)');
})

function catalog(okCb = null, errCb = null) {
  fs.readFile("./server/db/catalogData.json", 'utf-8', (err, data) => {
    if (err) {
      errCb(err, data)
    } else {
      okCb(err, data)
    }
  })
}

function save(data, file, cbOk, cbErr = null) {
  fs.writeFile(file, JSON.stringify(data, null, " "), err => {
    //response.json(catalog)
    if (err) {
      cbErr(err)
    } else {
      cbOk();
    }
  })

}

// return all catalog
server.get('/catalog.json', (req, res) => {
  catalog((e, d) => {res.send(d)})
})

// create new item in catalog
server.post('/addtocatalog.json', (req, res) => {
  catalog((e, d) => {
      let catalog = JSON.parse(d);
      let id = 1 + Math.max(...catalog.map(el => el.id_product));
      catalog.push(Object.assign({}, req.body, {id_product: id}));
      save(catalog, "./server/db/catalogData.json",
        () => res.send(catalog),
        er => res.sendStatus(500, 'wrong saving data'))
    },
    (e, d) => {
      res.sendStatus(500, 'catalog not found')
    })
})

server.get('/basket.json', (request, response) => {
  fs.readFile("./server/db/getBasket.json", 'utf-8',
    (err, data) => {
      if (!err) {
        // response.json(data);
        response.send(data)
      }
    })
})

// remove item from basket fully
server.delete('/delbasket.json/:id', (request, response) => {
  fs.readFile("./server/db/getBasket.json", 'utf-8',
    (err, data) => {
      if (!err) {
        let basket = JSON.parse(data);
        let oldBasket = basket.contents
        basket.contents = oldBasket.filter(b => b.id_product !== +request.params.id);
        if (oldBasket.length === basket.contents.length) {
          response.sendStatus(500, 'wrong removed item')
        } else {
          fs.writeFile("./server/db/getBasket.json", JSON.stringify(basket, null, " "), err => {
            response.json({'result': err ? 0 : 1})
          })
        }
      } else {
        response.json({'result': 0})
      }
    })
})

// put new item to basket
server.post('/tobasket.json', (request, response) => {
  let addObj = request.body;
  fs.readFile("./server/db/getBasket.json", 'utf-8',
    (err, data) => {
      if (!err) {
        let basket = JSON.parse(data);
        let inBasket = basket.contents.find(b => b.id_product === addObj.id_product);
        if (inBasket) { // товара не доожно быть в корзине
          response.sendStatus(500, "Can't create existing item")
        } else {
          basket.contents.push(Object.assign({}, addObj, {quantity: 1}));
          fs.writeFile("./server/db/getBasket.json", JSON.stringify(basket, null, " "), err => {
            response.json({'result': err ? 0 : 1})
          })
        }
      } else {
        response.json({'result': 0})
      }
    })
})

// change quantity for item in basket
server.put('/changecart.json/:id', (request, response) => {
  let Obj = request.body;
  fs.readFile("./server/db/getBasket.json", 'utf-8',
    (err, data) => {
      if (!err) {
        let basket = JSON.parse(data);
        let delta = request.body.delta;
        let id = +request.params.id;
        let inBasket = basket.contents.find(b => b.id_product === id);
        if (inBasket.quantity + delta <= 0) {
          response.sendStatus(500, "Can't remove unexisting item")
        } else {
          inBasket.quantity += delta;
          fs.writeFile("./server/db/getBasket.json", JSON.stringify(basket, null, " "), err => {
            response.json({'result': err ? 0 : 1})
          })
        }
      } else {
        response.json({'result': 0})
      }
    })
})

server.listen(8880, () => {
  console.log('server listen @8880...');
});


