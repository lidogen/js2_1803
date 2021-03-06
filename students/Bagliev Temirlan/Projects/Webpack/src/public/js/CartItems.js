import ListItems from './ListItems.js'

export default class CartItems extends ListItems {
    constructor(item) {
        super(item);
        this.img ="https://placeimg.com/500/325/tech"
    }
    getProductHTML(){
        return `<div class="cart-item" data-id="${this.item.id_product}">
                    <img src="${this.img}" width="${100}" heigh="${80}" alt="${this.item.product_name}">
                    <div class="product-desc">
                        <p class="product-title">${this.item.product_name}</p>
                        <p class="product-quantity">${this.item.quantity}</p>
                        <p class="product-single-price">${this.item.price}</p>
                    </div>
                    <div class="right-block">
                        <button name="del-btn" class="del-btn" data-id="${this.item.id_product}">&times;</button>
                    </div>
                </div>`
    }
}