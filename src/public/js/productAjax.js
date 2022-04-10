const { create } = require("../../components/user/userModel");

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

function addProduct(productID, quantity = 1) {
    const url = '/api/products/add/' + productID;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: productID,
            quantity: quantity
        })
    }).then(r => r.json()).then(data => {
        $("#number-product-incart").html(data.number);
    });

    alert(`Add ${productID} to cart successfully`);
}

function getProductByField(field, type, page) {
    const $product = $('#product-list');
    const $start = $('#stat-end');
    const $pagination = $('#pagination');
    $.ajax({
        url: '/api/products/field',
        type: 'GET',
        data: {
            field: field,
            type: type,
            page: page
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

            $start.append(`
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="shop__product__option__left">
                        <p>Showing ${products.start}–${products.end} of ${products.total} results</p>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="shop__product__option__right">
                         <p>Sort by:</p>
                            <select style="display: none;">
                                <option>Random</option>
                                <option>Low to High</option>
                                <option>High to Low</option>
                            </select><div class="nice-select" tabindex="0">
                            <span class="current">${products.field}</span>
                            <ul class="list">
                                <li data-value="" class="option" onclick="getProductByField('Random','',1)">Random</li>
                                <li data-value="" class="option" onclick="getProductByField('Low to High','sort',1)">Low to High</li>
                                <li data-value="" class="option" onclick="getProductByField('High to Low','sort',1)">High to Low</li>
                            </ul></div>
                    </div>
                </div>
            </div>

           `);

            products.data.forEach((item, index) => {
                const str = `
                <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="card" style="width: 18rem;">
                        <a href="/product/${item._id}">
                            <img class="card-img-top" src="${item.thumb}" alt="Card image cap">
                        </a>
                        <div class="card-body" id="card-body">
                            <a href="/product/${item._id}">
                                <h5 id="product-name"><b>${item.name}</b></h5>
                            </a>
                            <input type="hidden" name="id" value="${item._id}" />
                            <a href="javascript:{}" id="add-product-${item._id}" class="add-cart"
                                onClick="addProduct('${item._id}')">
                                + Add to cart
                            </a>
                            <h5>$${item.price}</h5>
                        </div>
                    </div>
                </div>`;
                const html = $.parseHTML(str);
                $product.append(html);
            });

            $pagination.append(`
                a
                    <button class="page-link" style="color: #0b0b0b" href="#"
                       aria-label="Previous" onclick="getProductByField('${products.field}','${products.type}','${products.prev}')">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                <li class="page-item ${products.hiddenPrev}"
                    style="${products.disablePrev} ${products.numberPrev} color: #0b0b0b;">
                    <button class="page-link" style="color: #0b0b0b" onclick="getProductByField('${products.field}','${products.type}','${products.prev}')"> ${products.prev} </button>
                </li>
                <li class="page-item active" style="color: #0b0b0b;">
                    <button class="page-link" disabled style="color: #0b0b0b" onclick="getProductByField('${products.field}','${products.type}','${products.page}')"> ${products.page} </button>
                </li>
                <li class="page-item ${products.hiddenNext}"
                    style="${products.disableNext} ${products.numberNext} color: #0b0b0b">
                    <button class="page-link" style="color: #0b0b0b" onclick="getProductByField('${products.field}','${products.type}','${products.next}')""> ${products.next} </button>
                </li>
                <li class="page-item" style="${products.disableNext} color: #0b0b0b">
                    <button class="page-link" style="color: #0b0b0b" onclick="getProductByField('${products.field}','${products.type}','${products.next}')"
                       aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            `);
        }
    });
}

window.onload = function () {
    getProductByField('Random', '', 1);
}

function postReview()
{
    event.preventDefault()
    const content = $('#review-form input[type=text]').val()

    const productID = $('#review-form input[type=hidden]').val()
    const url=`/api/products/review/${productID}`

    $.post(url, {content: content}, function(data){
        let review_list = $('#review-list')

        if (!review_list.length) 
        {
            //reassign id element
            review_list = $('#review-list-empty')

            //clear child
            review_list.empty()

            //reassign id element
            review_list.attr("id","review-list")
        }

        const createAt = new Date(data.createAt)

        review_list.prepend(`
        <h4 style="font-weight: bold;">${data.fullname}</h4>
        <span>${createAt}</span>
        <p style="font-size: 16px">${content}</p>
        <hr>
        </div>
    `);

    }).fail(function(data){
        if(data.status==401)
            window.location.href='/auth/login/'
        else if(data.status==400)
            alert("Please dont leave it blank")
    })
}