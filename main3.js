function parse(){
    return new Promise(function(resolve, reject){
        request('http://localhost:8888/api-gw/v1/nodered/flow?flowId=quang', function (error, response, body) {
            // in addition to parsing the value, deal with possible errors
            if (err) return reject(err);
            try {
                // JSON.parse() can throw an exception if not valid JSON
                resolve(JSON.parse(body).data.available_balance);
            } catch(e) {
                reject(e);
            }
        });
    });
}

parse().then(function(val) {
    console.log(val);
}).catch(function(err) {
    console.err(err);
});