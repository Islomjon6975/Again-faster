function renderCartItems() {
    fetch('/cart.js').then(res => res.json()).then(data => data.items.map(item => {
        const cartDiv = document.querySelector('.mycart__products');

        formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2
        });
        
        const template = `
        <div class="mycart__product">
            <a href="{{ item.url | within: collections.all }}" class="mycart__img--wrapper">
                <img src="${item.image}" alt="{{ item.title | escape }}">
            </a>
            <div class="mycart__product--details">
                <div class="mycart__wrapper">
                    <a href="{{ item.url }}" class="mycart__product--title h5">${item.product_title}</a>
                    <p class="mycart__product--price h5">${this.formatter.format(item.final_line_price / 100)}</p>
                </div>
                <div class="mycart__wrapper">
                    <h5 class="mycart__product--weight h5">{{ item.variant.title }}</h5>
                    <a href="/cart/change?line={{ forloop.index }}&amp;quantity=0" class="mycart__close--wrapper">
                        {% render 'icon-close' %}
                    </a>
                </div>
                <div class="mycart__calculator">
                    {% render 'icon-minus' %}
                    <span class="mycart__count p">${item.quantity}</span>
                    {% render 'icon-plus' %}
                </div>
            </div>
        </div>
    `
    cartDiv.insertAdjacentHTML('afterend', template);
}))
}

renderCartItems()