
let API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//кнопка показать-скрыть корзину
let app = new Vue({
    el: '#cart-block',
    data: {
        items: [],
        show: false
    },
    methods: {
    },
    computed: {
    },
});

//Каталог (список)
class List {
    constructor(url, container) {
        this.url = url;
        this.container = container;
        this.items = [];
        this._init()    //метод инициализации
    }
    //Метод инициализации (по умолчанию ничего не делает для инициализации в каталоге и корзине)
    _init() {
        return false
    }
    // Через промис (будет возвращать new promis "Получение данных")
    getData(url) {
        return fetch(API + url).then(dataReceived => dataReceived.json())
    }
    //создание переменной block - принятией ей контейнера с конструктора
    render() {
        let block = document.querySelector(this.container);
        let htmlString = '';
        this.items.forEach(item => {
            htmlString += new lists[this.constructor.name](item).render()
        });
        block.innerHTML = htmlString;
    }
}

//Списки (компоненты) формирование разметки "Карта товара"
class ListItem {
    constructor(item) {
        this.item = item;
        this.img = 'https://placehold.it/300x200';
    }
    //метод возвращает разметку
    render() {
        return `
                <div class="product-item">
                    <img src="${this.img}" alt="${this.item.product_name}">
                    <div class="desc">
                        <h1>${this.item.product_name}</h1>
                        <p>${this.item.price}</p>
                        <button 
                            class="buy-btn" 
                            name="buy-btn"
                            data-name="${this.item.product_name}"
                            data-price="${this.item.price}"
                            data-id="${this.item.id_product}"
                        >Купить</button>
                    </div>
                </div>
            `
    }
}
//Пробрасываем данные в блок продукта
class Catalog extends List {
    constructor(url, container) {
        super(url = '/catalogData.json', container = '.products');
        this.cart = null;
    }
    //метод _init будет вызвать метод getData буде пробрасывать туда this.url
    _init() {
        this.getData(this.url)
            .then(d => { this.items = d })
            .then(() => { this.render() })
            .finally(() => {
                this._handleEvents();
            })
    }

    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'buy-btn') {
                this.cart.addProduct(evt.target);
                this.cart.getTotalPrice();
                this.cart.renderPrice();
                this.cart.renderIndex();
            }
        })
    }
}
//Пробрасываем данные в блок корзины
class Cart extends List {
    constructor(url, container) {
        super(url = '/getBasket.json', container = '.cart-items');
        this.cartList = {};
        this.cartMass = [];
    }
    _init() {
        this.getData(this.url)
            .then(d => { this.items = d })
            .then(() => { this.render() })
            .finally(() => {
                this._handleEvents()
            })
    }
    _handleEvents() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.name === 'del-btn') {
                this.deleteProduct(evt.target);
                this.getTotalPrice();
                this.renderPrice();
                this.renderIndex();
            }
        })
    }
    //удаление товара целиком
    deleteProduct(item) {

        for (let i = 0; i < this.cartMass.length; i++) {
            if (this.cartMass[i].id_product === item.dataset.id_product) {
                this.cartMass.splice(i, 1);
            }
        }
    }
    //Добавление товара "если" уже есть, то ++
    addProduct(item) {
        if (this.cartMass.find(id => id.id === item.dataset.id)) {

            this.cartMass.find(id => id.id === item.dataset.id).count++;

        } else {

            this.cartMass.push({
                id: item.dataset.id,
                product_name: item.dataset.name,
                price: item.dataset.price,
                count: 1,
            })
        }


    }
    getTotalPrice() {
        this.totalPrice = 0;
        this.cartMass.forEach(item => {
            this.totalPrice += item.price * item.count;
        });

    }
    renderPrice() {
        let priceBox = document.getElementById("price")
        priceBox.innerText = this.totalPrice;
    }
    renderIndex() {
        let block = document.querySelector(this.container);
        let htmlString = '';
        this.cartMass.forEach(item => {
            htmlString += new lists[this.constructor.name](item).render()
        });
        block.innerHTML = htmlString;
    }
}
//карта корзины
class CatalogItem extends ListItem {
    constructor(item) {
        super(item)
    }
}

class CartItem extends ListItem {
    constructor(item) {
        super(item);
        this.img = 'https://placehold.it/100x80';
    }
    render() {
        return `<div class="cart-item" data-id="${this.item.id}">
                    <img src="${this.img}" alt="">
                    <div class="product-desc">
                        <p class="product-title">${this.item.product_name}</p>
                        <p class="product-quantity">${this.item.quantity}</p>
                        <p class="product-single-price">${(this.item.price) * this.item.count}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${this.item.id}">&times;</button>
                    </div>
                </div>`
    }
}

let lists = {
    Catalog: CatalogItem,
    Cart: CartItem
};

export default function () {
    let test = new List('/catalogData.json');
    let testCat = new Catalog();
    let testCrt = new Cart();

    testCat.cart = testCrt;
}
