var request = require('sync-request');
var res = request('GET', 'http://localhost:8888/api-gw/v1/user/verify', {
    headers: {
        'user-agent': 'example-user-agent',
        'authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2dW5ndXllbkBnbWFpbGMub20iLCJpYXQiOjE2MjIxODc1NDMsImV4cCI6MTYyMjI3Mzk0M30.GJfq7xC6-KjCQ7RcWVUk4_zJmUH-gNaUj1hkfNBiJpXn2Dd3Hd7ylb13De_QYjezRONESUCL3AEkeD6M6EOXtg',
    },
});
console.log(JSON.parse(res.getBody('utf8')).message);
console.log("22")
