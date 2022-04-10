// window.onload = loadProduct();
window.addEventListener('load', loadProduct);

function loadProduct() {
    const url = '/api/cart/products';
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json()).then(data => {
        const $product_table = $("#cart-table");
        $product_table.html("");

        data.products.forEach((item, index) => {
            const html = `
            <tr>
                <td class="product__cart__item">
                    <div class="product__cart__item__pic">
                        <a href="/product/${item._id}">
                            <img src="${item.thumb}" style="width: 150px; object-fit: contain;"
                                alt="thumbnail">
						</a>
                    </div>
                    <div class="product__cart__item__text">
                        <h6>${item.name}</h6>
                        <h5>$${item.price}</h5>
                    </div>
                </td>
        
                <td class="quantity__item">
                    <div class="quantity">
                        <div class="pro-qty-2 d-flex">
                            <button class="btn-minus" onclick="changeQuantity('${item._id}', 'minus')">-</button>
                            <input type="number"  name="quantity" id=${item._id} value="${item.quantity}">
                            <button class="btn-plus"  onclick="changeQuantity('${item._id}', 'plus')">+</button>
                        </div>
                    </div>
                </td>
                <td class="cart__price">$${item.total}</td>
                <td class="cart__close">
                    <a href="javascript:{}" onclick="deleteProductInCart('${item._id}')">
                        <i class="fa fa-close"></i>
                    </a>
        
                </td>
            </tr>`

            $product_table.append($.parseHTML(html));


            $("#number-product-incart").html(data.number_products);
            $("#cart-total").html(data.total);
        });
    });
}


function deleteProductInCart(productID) {
    const url = '/api/cart/delete/' + productID;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: productID
        })
    }).then(r => r.json()).then(data => {
        const $product_table = $("#cart-table");

        // clear product table
        $product_table.html("");

        // load product again
        loadProduct();

    });
}

function changeQuantity(productID, type) {
    const url = '/api/cart/change-quantity/' + productID + '/' + type;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: productID,
            type: type
        })
    }).then(r => r.json()).then(data => {
        const $product_table = $("#cart-table");

        // clear product table
        $product_table.html("");

        // load product again
        loadProduct();

    });
}