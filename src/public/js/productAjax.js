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


function getData() {
    const $product = $('#demo');
    fetch('/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json()).then(data => {
        let payload = data.payload;
        $product.html('');
        if (payload.length < 1) {
            $product.html('');
            return;
        }
        payload.forEach((item, index) => {
            $product
                .append(`<div class="col-lg-4 col-md-6 col-sm-6">
							<div class="product__item sale">
								<div class="product__item__pic set-bg" data-setbg=${item.thumb}">
									<span class="label">Sale</span>
									<ul class="product__hover">
										<li><a href="#"><img src="/img/icon/heart.png" alt=""/></a></li>
										<li><a href="#"><img src="/img/icon/compare.png" alt=""/>
											<span>Compare</span></a>
										</li>
										<li><a href="/product/${item._id}"><img src="/img/icon/search.png" alt=""/></a>
										</li>
									</ul>
								</div>
								<div class="product__item__text">
									<h6>${item.name}</h6>
									<form action="/product" id="add-form-${index}" method="post">
										<input type="hidden" name="id" value="${item._id}">
										<a href="javascript:{}" class="add-cart"
										   onclick="document.getElementById('add-form-${index}').submit();">+ Add
											To
											Cart</a>
									</form>
									<h5>$${item.price}</h5>
									<div class="product__color__select">
											<label for="pc-17" style="background-color: {{this}};">
												<input type="radio" id="pc-17"/>
											</label>
									</div>
								</div>
							</div>
						</div>`);
        })
    });
}