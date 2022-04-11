// pagination function
module.exports.paging = (data, page, limit) => {
    // get the total number of pages
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};

    // check if there is a next page
    if (endIndex < data.length) {
        result.next = page + 1;
    } else {
        result.disableNext = 'pointer-events: none;';
        result.hiddenNext = 'hidden';
        result.numberNext = 'display: none;';
    }

    // check if there is a previous page
    if (startIndex > 0) {
        result.prev = page - 1;
    } else {
        result.disablePrev = 'pointer-events: none;';
        result.hiddenPrev = 'hidden';
        result.numberPrev = 'display: none;';
    }

    // get the data for the current page
    result.page = page;
    result.data = data.slice(startIndex, endIndex);
    result.start = startIndex + 1;

    if (data.length > endIndex) {
        result.end = endIndex;
    } else {
        result.end = data.length;
    }
    result.total = data.length;

    return result;
}

module.exports.reviewPaging = (productID, totalPage, page) => {
    const buffer = [];

    if (page <= totalPage) {
        buffer.push(`<a class="prev_page" onclick="abcd('${productID}', ${totalPage},${page - 1})">Prev</a>`);
        buffer.push(`<a onclick="abcd('${productID}', ${totalPage},1)">1</a>`);

        if (totalPage <= 4)
            for (let i = 2; i <= totalPage; i++)
                buffer.push(`<a onclick="abcd('${productID}', ${totalPage},${i})">${i}</a>`);

        else {
            if (page <= 3) {
                for (let i = 2; i <= Math.min(3, totalPage); i++)
                    buffer.push(`<a onclick="abcd('${productID}', ${totalPage},${i})">${i}</a>`);

                if (page === 3) {
                    if (totalPage > 3) {
                        buffer.push(`<a onclick="abcd('${productID}', ${totalPage},4)">4</a>`);
                    }
                }

                if (totalPage - 2 > 2) {
                    buffer.push(`<span>...</span>`);
                    buffer.push(`<a onclick="abcd('${productID}', ${totalPage},${totalPage})">${totalPage}</a>`);
                }
            } else if (page > 3) {
                buffer.push(`<span>...</span>`);

                if (totalPage - page > 2) {

                    for (let i = page - 1; i <= page; i++) {
                        buffer.push(`<a  onclick="abcd('${productID}', ${totalPage},${i})">${i}</a>`);
                    }
                    buffer.push(`<a  onclick="abcd('${productID}', ${totalPage},${page + 1})">${page + 1}</a>`);
                    buffer.push(`<span>...</span>`);
                    buffer.push(`<a onclick="abcd('${productID}', ${totalPage},${totalPage})">${totalPage}</a>`);
                } else {
                    if (page === totalPage - 2) {
                        buffer.push(`<a onclick="abcd('${productID}', ${totalPage},${page - 1})">${page - 1}</a>`);
                    }

                    for (let i = totalPage - 2; i <= totalPage; i++) {
                        buffer.push(`<a onclick="abcd('${productID}', ${totalPage},${i})">${i}</a>`);
                    }
                }

            }
        }

        if (page < totalPage)
            buffer.push(`<a class="next_page" onclick="abcd('${productID}', ${totalPage},${page + 1})">Next</a>`);

        for (let i = 1; i < buffer.length - 1; i++) {
            if (buffer.at(i).search(page.toString()) !== -1) {
                const index = buffer.at(i).lastIndexOf("\"")
                const oldStr = buffer.at(i)
                buffer[i] = [oldStr.slice(0, 2), ` class="active" `, oldStr.slice(3)].join('')
                break;
            }

        }
    }
    return buffer;
}