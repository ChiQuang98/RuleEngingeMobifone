const fs = require('fs');

let rawdata = fs.readFileSync('settings.json');
let settings = JSON.parse(rawdata);

function getHostNodered() {
    return settings.NoderedAPI.host_nodered
}
function getPortNodered() {
    return settings.NoderedAPI.post_nodered
}
function getUrlSaveFlow() {
    return settings.UrlAPI.url_save_flow
}
function getUrlGetFlow() {
    return settings.UrlAPI.url_get_flow
}
function getUrlCheckToken() {
    return settings.UrlAPI.url_check_token
}

module.exports = {
    getHostNodered,
    getPortNodered,
    getUrlCheckToken,
    getUrlGetFlow,
    getUrlSaveFlow
};