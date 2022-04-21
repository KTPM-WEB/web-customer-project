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

            products.data.forEach((item) => {
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

            if (products.data.length < 1) {
                $pagination.html('');
                $start.html(
                    `<div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6">
                            <div class="shop__product__option__left">
                                <p>Showing 0 results</p>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6">
                            <div class="shop__product__option__right">
                                <p>Sort by:</p>
                                <select style="display: none;">
                                    <option>Random</option>
                                    <option>Low to High</option>
                                    <option>High to Low</option>
                                </select>
                                <div class="nice-select" tabIndex="0">
                                    <span class="current">${products.field}</span>
                                    <ul class="list">
                                        <li data-value="" class="option"
                                            onClick="getProductByField('Random','',1)">Random
                                        </li>
                                        <li data-value="" class="option"
                                            onClick="getProductByField('Low to High','sort',1)">Low to High
                                        </li>
                                        <li data-value="" class="option"
                                            onClick="getProductByField('High to Low','sort',1)">High to Low
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`
                );
                return;
            }


            $start.html(`
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
            </div>`);

            $pagination.html(`
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

function loadProductVariation(size_idx, color_idx)
{
    const productID = $(`input[name=product-id]`).val()
    const url = `/api/products/load/${productID}`
    $.get(url, function (data){
        const variations = data.variations

        if (variations == null)
        {
            $(`.product__details__text`).html(`<h3>Coming soon...</h3>`)
            $(`#product-detail-review-section`).empty()
        }
        else
        {
            //unique filter
            const unique_sizes = []
            const unique_colors = []
            for (let i=0;i<variations.length;i++)
            {
                if (!unique_sizes.includes(variations[i].size))
                    unique_sizes.push(variations[i].size)

            }

            for (let i=0;i<variations.length;i++)
            {
                if (variations[i].size == unique_sizes[size_idx] && !unique_colors.includes(variations[i].color))
                    unique_colors.push(variations[i].color)
            }


            const product_detail_size = $(`#product-detail-size`)
            product_detail_size.empty()

            for (let i=0;i<unique_sizes.length;i++)
                product_detail_size.append(`
                      <label for="${unique_sizes[i]}">${unique_sizes[i]}
                        <input type="radio" id="${unique_sizes[i]}" value="${unique_sizes[i]}" name="size">
                      </label>`)

            const product_detail_color = $(`#product-detail-color`)
            product_detail_color.empty()

            for (let i=0;i<variations.length;i++)
            {
                if (variations[i].size == unique_sizes[size_idx])
                {
                    product_detail_color.append(`
                      <label for="${variations[i].color}" style="background-color: ${variations[i].color}">
                        <input type="radio" id="${variations[i].color}" value="${variations[i].color}" name="color">
                      </label>`)
                }

            }

            if (variations)
            {
                product_detail_size.prepend(`<span>Size:</span>`)
                product_detail_color.prepend(`<span>Color:</span>`)

                //set active size
                const size_label = product_detail_size.children(`label[for=${unique_sizes[size_idx]}]`)
                size_label.attr("class","active")
                size_label.children(`input`).prop('checked', true)

                //set active color
                const color_label = product_detail_color.children(`label[for='${unique_colors[color_idx]}']`)
                color_label.attr("class","active")
                color_label.children(`input`).prop('checked', true)
            }

            for (let i=0; i<variations.length; i++)
            {
                if (variations[i].size == unique_sizes[size_idx] && variations[i].color == unique_colors[color_idx])
                {
                    $(`#product-detail-price`).text('$' + variations[i].price)
                    $(`#product-detail-stock`).text(variations[i].stock)
                }
            }
        }
    })

}

function changeVariation(field)
{
    const productID = $(`input[name=product-id]`).val()

    const size = $(`#product-detail-size input[name=size]:checked`).val()
    const color = $(`#product-detail-color input[name=color]:checked`).val()

    const unique_sizes = []
    const unique_colors = []

    const url = `/api/products/load/${productID}`
    $.get(url, function (data) {
        const variations = data.variations
        const index = 0
        for (let i=0; i<variations.length; i++)
            if(!unique_sizes.includes(variations[i].size))
                unique_sizes.push(variations[i].size)

        for (let i=0; i<variations.length; i++)
            if(variations[i].size == size && !unique_colors.includes(variations[i].color))
                unique_colors.push(variations[i].color)

        let index_color = unique_colors.indexOf(color)
        if (field =='size')
            index_color = 0
        loadProductVariation(unique_sizes.indexOf(size), index_color)

    })

}


function postReview()
{
    event.preventDefault()
    let stranger_name = null
    if ($('#review-stranger-name'))
        stranger_name = $('#review-stranger-name').val()
    const content = $('#review-content').val()

    const productID = $('#review-form input[type=hidden]').val()
    const url=`/api/products/review/${productID}`

    $.post(url, {stranger_name: stranger_name,content: content}, function(data){
        const limit = 3

        //set empty for inputs
        $('#review-content').val('')
        $('#review-stranger-name').val('')

        const review_list = $('#review-list')
        const length = $('.review-box').length

        if (length === 0) {
            //clear sorry paragraph
            $('#empty-review-list').remove()

            //generate new pagination
            const pagination = $('#review-pagination')
            if (data.buffer)
                for (let i=0; i<data.buffer.length; i++)
                    pagination.append(data.buffer[i])
        }

        if (length < limit)
        {
            //add review to list
            const date = new Date(data.reviews[0].createdAt)
            let name = data.reviews[0].fullname || stranger_name
            let avatar = data.reviews[0].avatar || "https://ssl.gstatic.com/docs/common/profile/nyancat_lg.png"

            review_list.prepend(`
            <div class="review-box">
                <div class="review-user-avatar">
                    <img src="${avatar}" alt="user's avatar"></img>
                </div>
                <div class="review-user-detail">
                    <h5>${name}</h5>
                    <span>${date}</span>
                    <p>${data.reviews[0].content}</p>
                </div>
            </div>
            <hr>`);


        }
        else if (length === limit) //prevent exceed page limit
            displayReviewPage(1)

    }).fail(function(data){
        if(data.message===401)
            window.location.href='/auth/login/'
        else if(data.status === 400)
            alert(data.responseJSON.message)
    })
}


function displayReviewPage(page)
{
    const productID = $('#review-form input[type=hidden]').val()

    const url = `/api/products/review/${productID}?page=${page}`
    $.get(url, function(data) {
        //get reference element

        const review_list = $('#review-list')
        const pagination = $('#review-pagination')

        review_list.empty()
        pagination.empty()

        //generate new review list
       for(let i=0 ; i < data.reviews.length ; i++)
       {
           const name = data.reviews[i].fullname || data.reviews[i].stranger_name
           const avatar = data.reviews[i].avatar || "https://ssl.gstatic.com/docs/common/profile/nyancat_lg.png"
           const date = new Date(data.reviews[i].createdAt)

           review_list.append(`                
            <div class="review-box">
                <div class="review-user-avatar">
                    <img src="${avatar}" alt="user's avatar"></img>
                </div>
                <div class="review-user-detail">
                    <h5>${name}</h5>
                    <span>${date}</span>
                    <p>${data.reviews[i].content}</p>
                </div>
            </div>
            <hr>`)
       }

       //generate new pagination
       for (let i=0 ; i<data.buffer.length ; i++)
           pagination.append(data.buffer[i])

    })
}


window.onload = function () {
    getProductByField('Random', '', 1);
    loadProductVariation(0,0)
}