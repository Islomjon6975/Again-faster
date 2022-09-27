class Cart {
    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    });

    async fetchAPI(api, formData) {
        const response = await fetch(`/cart/${api}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        return await response.json();
    }

    addItem(formData) {
        return this.fetchAPI('add.js', formData);
    }

    changeItem(formData) {
        return this.fetchAPI('change.js', formData);
    }

    async getCartDetails() {
        const response =  await fetch(`/cart.js`);
        return response.json();
    }

    deleteItem(line) {
        this.changeItem({line: line,quantity: 0}).then(res => this.renderCartItems(res))
    }

    async getProduct(handle) {
        const response =  await fetch(`/products/${handle}.js`);
        return response.json();
    }

    async updateCart() {
        const cartDetails = await this.getCartDetails();
        this.renderCartItems(cartDetails)
    }

    closeModal() {
        const sideCart = document.querySelector(".mycart");
        sideCart.classList.toggle("open");
        document.body.removeAttribute('style');
    }

    renderCartItems(cartDetails) {
        const cartItemsWrapper = document.querySelector(".mycart__products");
        cartItemsWrapper.innerHTML = "";

        for (let item of cartDetails.items) {
            const template = `
                <div class="mycart__product" data-id="${item.id}" data-amount="${item.quantity}">
                    <div class="mycart__img--wrapper">
                        <img src="${ item.image }" alt="${ item.title }" class="mycart__product-img">
                    </div>
                    <div class="mycart__product--details">
                        <div class="mycart__wrapper">
                            <a href="${ item.url }" class="mycart__product--title h5">${ item.title }</a>
                            <p class="mycart__product--price h5">${this.formatter.format(item.price / 100)}</p>
                        </div>
                        <div class="mycart__wrapper">
                            <h5 class="mycart__product--weight h5">${ item.variant_options[0] }</h5>
                            <img data-operator="remove" class="remove-variant" src="https://cdn.shopify.com/s/files/1/0609/7030/3540/files/icon-close.liquid?v=1664294173" />
                        </div>
                        <div class="mycart__calculator">
                            <img data-operator="minus" src="https://cdn.shopify.com/s/files/1/0609/7030/3540/files/icon-minus.liquid?v=1664294349" />
                            <span class="mycart__count p">1</span>
                            <img data-operator="plus" src="https://cdn.shopify.com/s/files/1/0609/7030/3540/files/icon-plus.liquid?v=1664294335" />
                        </div>
                    </div>
                </div>
            `

            cartItemsWrapper.insertAdjacentHTML('beforeend', template);
        }

        // const sideCartTotalPrice = document.querySelector(".side-cart__total-price");
        // sideCartTotalPrice.textContent = "Subtotal " + this.formatter.format(cartDetails.total_price / 100);

        const sideCartItemCart = document.querySelector(".basket__counter");
        sideCartItemCart.textContent = cartDetails.item_count
    }

    async toggleCart() {
        await this.updateCart();
        const sideCart = document.querySelector(".mycart");
        
        sideCart.classList.toggle("open");
        document.body.setAttribute('style', 'overflow: hidden');
    }

    addToCart() {
        const variantId = document.querySelector(".product-details__variants-item-input:checked");
        console.log(variantId.getAttribute('id'))
        const formData = {
            items: [{
                id: variantId.value,
                quantity: 1
            }]
        }

        this.addItem(formData).then(() => this.toggleCart());
    }

    addCartItemCount() {
        this.getCartDetails().then(cartDetails => {
            const headerCartLinks = document.querySelectorAll(".header-cart-link");
            headerCartLinks.forEach(link => {
                link.innerHTML += " (" + cartDetails.item_count + ")"
            })
        })
    }

    deleteItem({itemID}) {
        const formData = {
            id: itemID,
            quantity: 0
        }
        this.changeItem(formData).then(() => this.updateCart())
    }
}

const sideCart = new Cart();


const navIcons = document.querySelectorAll('.header__icons svg');
const baskett = navIcons[2]
baskett.addEventListener('click', () => {
    sideCart.toggleCart()
})


const close = document.querySelector('.mycart__top svg')
close.addEventListener('click', () => {
    sideCart.closeModal()
})

const addToCartBtn = document.querySelector('.addtocart')
addToCartBtn.addEventListener('click',function(e){
    e.preventDefault()
    console.log('clicked')
    sideCart.addToCart()
})

const mycartProducts = document.querySelector('.mycart__products')
mycartProducts.addEventListener('click', (e) => {
    const target = e.target.closest(".remove-variant")
    if(!target) return
    const operator = target.dataset.operator
    const cartItem = target.closest('.mycart__product')
    if(operator === 'remove') {
        sideCart.deleteItem({itemID:cartItem.dataset.id})
    }
})
