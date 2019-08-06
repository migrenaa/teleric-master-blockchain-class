
const request = require('request');

async function getTitles(searchTitle: string): Promise<any> {
    let titles = new Array<string>();
    let pagesCount = 1;
    let currentPage = 1;
    while (currentPage <= pagesCount) {
        const response = await getPage(searchTitle, currentPage);
        response.data.forEach(elem => {
            titles.push(elem.Title);
        });
        pagesCount = response.total_pages;
        currentPage++;
    }

    return titles.sort();
}

async function getPage(searchTitle: string, page: number): Promise<any> {
    const requestObj = {
        url: `https://jsonmock.hackerrank.com/api/movies/search`,
        qs: { "Title": searchTitle,  "page": page},
    };

    const result = await new Promise(function (resolve, reject) {
        request(requestObj, async function (err, response) {
            const output = response
            if (output.err) {
                reject(err);
            } else {
                resolve(JSON.parse(output.body));
            }
        });
    });
    return result;
}


getTitles("harry").then(x => console.log(x)).catch(err => console.log(err));