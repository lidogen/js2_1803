console.log("Hello, I'm server");

let fs = require('fs')
let express = require('express');

let server = express();
server.use(express.json());

server.get('/', (request, response) => {
  response.send('Hello "Teapot" :)');
})

function getCatalog(okCb = null, errCb = null) {
  fs.readFile("./server/db/catalogData.json", 'utf-8', (err, data) => {
    if (err) {
      errCb(err)
    } else {
      okCb(JSON.parse(data))
    }
  })
}

function getBasket(okCb = null, errCb = null) {
  fs.readFile("./server/db/getBasket.json", 'utf-8', (err, data) => {
    if (err) {
      errCb(err)
    } else {
      okCb(JSON.parse(data))
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
  getCatalog((d) => {
    res.send(d)
  })
})

// create new item in catalog
server.post('/addtocatalog.json', (req, res) => {
  getCatalog((catalog) => {
      let id = 1 + Math.max(...catalog.map(el => el.id_product));
      catalog.push(Object.assign({}, req.body, {id_product: id}));
      save(catalog, "./server/db/catalogData.json",
        () => res.send(catalog),
        er => res.sendStatus(500, 'wrong saving data'))
    },
    err => {
      res.sendStatus(500, 'catalog not found')
    })
})

server.get('/basket.json', (req, res) => {
  getBasket(
    ok => res.send(ok),
    err => res.sendStatus(500, "get basket failed")
  )
})

// remove item from basket fully
server.delete('/delbasket.json/:id', (request, response) => {
  getBasket(
    basket => {
      let oldBasket = basket.contents
      basket.contents = oldBasket.filter(b => b.id_product !== +request.params.id);
      if (oldBasket.length === basket.contents.length) {
        response.sendStatus(500, 'wrong removed item')
      } else {
        save(basket, "./server/db/getBasket.json",
          () => response.send({'result': 1}),
          err => response.send({'result': 0})
        )
      }
    },
    err => response.json({'result': 0})
  );
})

// put new item to basket
server.post('/tobasket.json', (req, res) => {
  getBasket(
    basket => {
      let inBasket = basket.contents.find(b => b.id_product === req.body.id_product);
      if (inBasket) { // товара не должно быть в корзине
        res.sendStatus(500, "Can't create existing item")
      } else {
        basket.contents.push(Object.assign({}, req.body, {quantity: 1}));
        save(basket, "./server/db/getBasket.json",
          () => res.json({"result": 1}),
          err => res.json({"result": 0}))
      }
    },
    err => res.json({'result': 0})
  )
})

// change quantity for item in basket
server.put('/changecart.json/:id', (req, res) => {
  getBasket(
    basket=>{
      let delta = req.body.delta;
      let id = +req.params.id;
      let inBasket = basket.contents.find(b => b.id_product === id);
      if (inBasket.quantity + delta <= 0) {
        res.sendStatus(500, "Can't remove unexisting item")
      } else {
        inBasket.quantity += delta;
        save(basket, "./server/db/getBasket.json",
          ()=>res.json({'result': 1}),
          err=>res.json({'result': 0 }))
      }
    },
    err=>res.json({'result': 0})
  )
})

server.listen(8880, () => {
  console.log('server listen @8880...');
});


