function sendData(e) {
    const $searchResult = $('#myList');
    let match = e.value.match(/^[a-zA-Z0-9]*/);
    let match2 = e.value.match(/\s*/);
    if (match2[0] === e.value) {
        $searchResult.html('');
        return;
    }
    if (match[0] === e.value) {
        fetch('/api/products/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                payload: e.value
            })
        }).then(r => r.json()).then(data => {
            let payload = data.payload;
            $searchResult.html('');
            if (payload.length < 1) {
                $searchResult.html('<h5>No results found</h5>');
                return;
            }
            payload.forEach((item, index) => {
                $searchResult
                    .append(`<li class="list-group-item text-black-20 small">
                                <form id="my-form" action="/product/${item._id}" method="get">
                                    <button class="text-black-50" onclick="document.getElementById('my-form').submit()"> ${item.name} </button> 
                                </form>
                            </li>`);
            })
        });
    }
}

function addProduct(productID) {
    const url = '/api/products/add/' + productID;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: productID
        })
    })

    alert(`Add ${productID} to cart successfully`);
}

function getProductByName() {
    const searchValue = document.getElementById("myInput").value;
    if (searchValue === '') return;

    const $product = $('#product-list');
    const $start = $('#stat-end');
    const $pagination = $('#pagination');
    $.ajax({
        url: '/api/products/search',
        type: 'GET',
        data: {
            name: searchValue
        },
        dateType: "JSON",
        success: function (products) {
            console.log(products);
            $product.html('');
            $start.html('');
            $pagination.html('');
            if (products.length < 1) {
                $product.html('');
                return;
            }

            $start.append(`<div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="shop__product__option__left">
                        <p>Showing ${products.start}–${products.end} of ${products.total} results</p>
                    </div>
                </div>
            </div>`);

            products.data.forEach((item, index) => {
                const str = `<div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="card" style="width: 18rem;">
                        <a href="/product/${item._id}">
                            <img class="card-img-top" src="${item.thumb}" alt="Card image cap">
                        </a>
                        <div class="card-body">
                            <h6>${item.name}</h6>
                            <input type="hidden" name="id" value="${item._id}">
                                <a href="javascript:{}" id="add-product-${item._id}" class="add-cart"
                                   onClick="addProduct('${item._id}')">+ Add
                                    To
                                    Cart</a>
                                <h5>$${item.price}</h5>

                        </div>
                    </div>
                </div>`;
                const html = $.parseHTML(str);
                $product.append(html);
            });
            $pagination.append(`<ul class="pagination" style="display: flex; justify-content: right;">
                <li class="page-item" style="${products.disablePrev} ">
                    <a class="page-link" style="color: #0b0b0b" href="/product/search?name=${products.name}&page=${products.prev}"
                       aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item ${products.hiddenPrev}"
                    style="${products.disablePrev} ${products.numberPrev} color: #0b0b0b;">
                    <a class="page-link" style="color: #0b0b0b" href="/product/search?name=${products.name}&page=${products.prev}
									"> ${products.prev} </a>
                </li>
                <li class="page-item active" style="color: #0b0b0b;">
                    <a class="page-link" style="color: #0b0b0b" href="/product/search?name=${products.name}&page=${products.page}
									"> ${products.page} </a>
                </li>
                <li class="page-item ${products.hiddenNext}"
                    style="${products.disableNext} ${products.numberNext} color: #0b0b0b">
                    <a class="page-link" style="color: #0b0b0b" href="/product/search?name=${products.name}&page=${products.next}
									"> ${products.next} </a>
                </li>
                <li class="page-item" style="${products.disableNext} color: #0b0b0b">
                    <a class="page-link" style="color: #0b0b0b" href="/product/search?name=${products.name}&page=${products.next}"
                       aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>`);
        }
    });
}

function getProductByField(field, type) {
    console.log(field, type);
    const $product = $('#product-list');
    const $start = $('#stat-end');
    const $pagination = $('#pagination');
    $.ajax({
        url: '/api/products/field',
        type: 'GET',
        data: {
            field: field,
            type: type
        },
        dateType: "JSON",
        success: function (products) {
            $product.html('');
            $start.html('');
            $pagination.html('');
            if (products.length < 1) {
                $product.html('');
                return;
            }

            $start.append(`<div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="shop__product__option__left">
                        <p>Showing ${products.start}–${products.end} of ${products.total} results</p>
                    </div>
                </div>
            </div>`);

            products.data.forEach((item, index) => {
                const str = `<div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="card" style="width: 18rem;">
                        <a href="/product/${item._id}">
                            <img class="card-img-top" src="${item.thumb}" alt="Card image cap">
                        </a>
                        <div class="card-body">
                            <h6>${item.name}</h6>
                            <input type="hidden" name="id" value="${item._id}">
                                <a href="javascript:{}" id="add-product-${item._id}" class="add-cart"
                                   onClick="addProduct('${item._id}')">+ Add
                                    To
                                    Cart</a>
                                <h5>$${item.price}</h5>

                        </div>
                    </div>
                </div>`;
                const html = $.parseHTML(str);
                $product.append(html);
            });
            $pagination.append(`<ul class="pagination" style="display: flex; justify-content: right;">
                <li class="page-item" style="${products.disablePrev} ">
                    <a class="page-link" style="color: #0b0b0b" href="/product?name=${products.field}&page=${products.prev}"
                       aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item ${products.hiddenPrev}"
                    style="${products.disablePrev} ${products.numberPrev} color: #0b0b0b;">
                    <a class="page-link" style="color: #0b0b0b" href="/product?name=${products.field}&page=${products.prev}
									"> ${products.prev} </a>
                </li>
                <li class="page-item active" style="color: #0b0b0b;">
                    <a class="page-link" style="color: #0b0b0b" href="/product?name=${products.field}&page=${products.page}
									"> ${products.page} </a>
                </li>
                <li class="page-item ${products.hiddenNext}"
                    style="${products.disableNext} ${products.numberNext} color: #0b0b0b">
                    <a class="page-link" style="color: #0b0b0b" href="/product?name=${products.field}&page=${products.next}
									"> ${products.next} </a>
                </li>
                <li class="page-item" style="${products.disableNext} color: #0b0b0b">
                    <a class="page-link" style="color: #0b0b0b" href="/product?name=${products.field}&page=${products.next}"
                       aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>`);
        }
    });
}