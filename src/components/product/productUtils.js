module.exports.paging=  (totalPage,page) =>
{
    const buffer=[];

    if (page <= totalPage) {
        buffer.push(`<a class="prev_page" href="/product?page=${page - 1}">Prev</a>`);
        buffer.push(`<a href="/product?page=1">1</a>`);

        if (totalPage <= 4)
            for (let i = 2; i <= totalPage; i++)
                buffer.push(`<a href="/product?page=${i}">${i}</a>`);

        else {
            if (page <= 3) {
                for (let i = 2; i <= Math.min(3, totalPage); i++)
                    buffer.push(`<a href="/product?page=${i}">${i}</a>`);

                if (page == 3) {
                    if (totalPage > 3) {
                        buffer.push(`<a href="/product?page=4">4</a>`);
                    }
                }

                if (totalPage - 2 > 2) {
                    buffer.push(`<span>...</span>`);
                    buffer.push(`<a href="/product?page=${totalPage}">${totalPage}</a>`);
                }
            }

            else if (page > 3) {
                buffer.push(`<span>...</span>`);

                if (totalPage - page > 2) {

                    for (let i = page - 1; i <= page; i++) {
                        buffer.push(`<a href="/product?page=${i}">${i}</a>`);
                    }
                    buffer.push(`<a href="/product?page=${page + 1}">${page + 1}</a>`);
                    buffer.push(`<span>...</span>`);
                    buffer.push(`<a href="/product?page=${totalPage}">${totalPage}</a>`);
                }
                else {
                    if (page == totalPage - 2) {
                        buffer.push(`<a href="/product?page=${page - 1}">${page - 1}</a>`);
                    }

                    for (let i = totalPage - 2; i <= totalPage; i++) {
                        buffer.push( `<a href="/product?page=${i}">${i}</a>`);
                    }
                }

            }
        }

        if (page < totalPage)
            buffer.push(`<a class="next_page" href="/product?page=${page + 1}">Next</a>`);

        for(let i=1;i<buffer.length-1;i++)
        {
            if (buffer.at(i).search(page.toString()) != -1)
            {
                const index = buffer.at(i).lastIndexOf("\"")
                const oldStr = buffer.at(i)
                const newStr = [oldStr.slice(0, 2), ` class="active" ` , oldStr.slice(3)].join('');
                console.log(newStr)
                buffer[i]=newStr
                break;
            }

        }
    }

    return buffer;
}