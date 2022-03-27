function createPagination(totalPage, page)
{
    const element = document.querySelector(".product__pagination");
    let liTag = '';

    if (totalPage > 1 && page <= totalPage) {
        if (page != 1)
            liTag += `<a class="prev_page" href="/product?page=${page - 1}">Prev</a>`;

        liTag += `<a href="/product?page=1">1</a>`;

        if (totalPage <= 4)
            for (let i = 2; i <= totalPage; i++)
                liTag += `<a href="/product?page=${i}">${i}</a>`;

        else {
            if (page <= 3) {
                for (let i = 2; i <= Math.min(3, totalPage); i++)
                    liTag += `<a href="/product?page=${i}">${i}</a>`;

                if (page == 3) {
                    if (totalPage > 3) {
                        liTag += `<a href="/product?page=4">4</a>`;
                    }
                }

                if (totalPage - 2 > 2) {
                    liTag += `<span>...</span>`;
                    liTag += `<a href="/product?page=${totalPage}">${totalPage}</a>`;
                }
            }

            else if (page > 3) {
                liTag += `<span>...</span>`;

                if (totalPage - page > 2) {

                    for (let i = page - 1; i <= page; i++) {
                        liTag += `<a href="/product?page=${i}">${i}</a>`;
                    }
                    liTag += `<a href="/product?page=${page + 1}">${page + 1}</a>`;
                    liTag += `<span>...</span>`;
                    liTag += `<a href="/product?page=${totalPage}">${totalPage}</a>`;
                }
                else {
                    if (page == totalPage - 2) {

                        liTag += `<a href="/product?page=${page - 1}">${page - 1}</a>`;
                    }

                    for (let i = totalPage - 2; i <= totalPage; i++) {
                        liTag += `<a href="/product?page=${i}">${i}</a>`;
                    }
                }

            }
        }

        if (page < totalPage)
            liTag += `<a class="next_page" href="/product?page=${page + 1}">Next</a>`;
    }
    element.innerHTML = liTag

    currentPageElement = document.querySelectorAll(`a[href='/product?page=${page}']`);
    currentPageElement[currentPageElement.length - 1].className = "active"
}
