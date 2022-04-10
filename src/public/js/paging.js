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
    result.start = startIndex+1;

    if(data.length > endIndex){
        result.end = endIndex;
    }else {
        result.end = data.length;
    }
    result.total = data.length;

    return result;
}
