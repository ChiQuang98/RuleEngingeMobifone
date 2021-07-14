var http = require('http');
const options = {
    hostname: '10.16.150.132',
    port: '8010',
    path: '/api-gw/v1/channel/list-all',
    method: 'GET',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dGNudHRAbW9iaWZvbmUudm4iLCJpYXQiOjE2MjYyMjcwNTksImV4cCI6MTYyNjMxMzQ1OX0.5i0E5EHwKA12SSWfyfa8ydKmgvEp8r9i8ckaXGJR72_YP1FYH-pGYXrT8Aq6PYXQSHXk5djHSkjlmsING2vGMA`
    }
}
callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        var rs = JSON.parse(str)
        // activeFlow = rs;
        // return rs
        console.log(rs)
        // console.log(rs.errorCode);
        console.log(response.statusCode);
        if (response.statusCode == 200) {
            console.log("IN QUANG")

        }
        else {
            console.log("OUT QUANG")

        }
    });

}
var req1 = http.request(options, callback);
req1.end();