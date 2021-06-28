
var http = require('http');
var settingconfig = require('./Settings')
var http = require('http');
const options = {
    hostname: settingconfig.getHostNodered(),
    port: settingconfig.getPortNodered(),
    path: settingconfig.getUrlGetFlow()+'?flowId='+`quang`,
    method: 'GET',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJOb2RlUmVkVXNlckBtb2JpZm9uZS52biIsImlhdCI6MTYyMjEwNzQzNywiZXhwIjoxNjIyMTkzODM3fQ.BEBxT0yAiI62adnoqSdWtCyhGj_VqwZPBdqMs2o4rscPfg0XknNbKc4yvlZ0i6y5wouViTyw6FqwyoRMlKjZAg`
    }
}
callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        // var rs = JSON.parse(str).message
        // activeFlow = rs;
        // return rs
        console.log(str);
    });
}
var req1 = http.request(options, callback);
req1.end();