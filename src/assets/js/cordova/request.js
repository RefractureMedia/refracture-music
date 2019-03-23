function cordova_request(url, callback) {
    try {
        cordova.plugin.http.sendRequest(
            url,
            {
                method: 'get',
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
                }
            },
            response => { callback(undefined, response.status, response.data); },
            error => { callback(error, error.status, undefined); }
        );
    } catch (e) {
        throw new Error(`Cordova Library %cAdvanced HTTP %cnot Found`);
    }
}

module.exports = cordova_request;