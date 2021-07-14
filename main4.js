var requestSync = require('sync-request');
// var res = request('GET', 'http://localhost:8888/api-gw/v1/user/verify', {
//     headers: {
//         'user-agent': 'example-user-agent',
//         'authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2dW5ndXllbkBnbWFpbGMub20iLCJpYXQiOjE2MjIxODc1NDMsImV4cCI6MTYyMjI3Mzk0M30.GJfq7xC6-KjCQ7RcWVUk4_zJmUH-gNaUj1hkfNBiJpXn2Dd3Hd7ylb13De_QYjezRONESUCL3AEkeD6M6EOXtg',
//     },
// });
// console.log(JSON.parse(res.getBody('utf8')).message);
// console.log("22")


var res = requestSync('GET', 'http://10.16.150.132:8010/api-gw/v1/channel/list-all', {
    headers: {
        'user-agent': 'example-user-agent',
        'authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJOb2RlUmVkVXNlckBtb2JpZm9uZS52biIsImlhdCI6MTYyNjE2OTQ4MSwiZXhwIjoxNjI2MjU1ODgxfQ.-0WIz7bi-Na0YIk7iBa32ve_kO1U5lx--GjKv38JsrU5ggIp5yg2Bx2qfhvR11Bkwd70VZt9L4gIBMt6WOqw8Qa`,
    },
});
// var finalData = JSON.stringify(JSON.parse(res.getBody('utf8')).message).replace(/\\/g, "");\
// var rs =
console.log("RESPONSE FLOW: "+res.getBody('utf8'))
var finalData = JSON.stringify(JSON.parse(res.getBody('utf8')));
console.log("QuangLoadFlow: "+finalData)