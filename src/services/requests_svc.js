/**
 * @Author: yxp
 * @Date:   2017-06-01 10:06:21
 * @Last modified by:   yxp
 * @Last modified time: 2017-06-01 18:06:70
 */
 export default {
     moviesShowingReq: 'https://api.douban.com/v2/movie/in_theaters',
     moviesTopReq: 'https://api.douban.com/v2/movie/top250',
     movieReq: 'https://api.douban.com/v2/movie/subject/:id',
 }

 export function resource(url, params = {}) {
    const _url = url.replace(/\/:(\w+)\/?/g, function (m, p1) {
        var value = params.p1;
        if (value) {
            delete params.p1;
            return params.p1;
        } else {
            return m;
        }
    });
    return fetch(_url).then(response => response.json());
 }
