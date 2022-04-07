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
            $searchResult
                .append(``)
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