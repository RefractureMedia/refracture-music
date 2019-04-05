const request = require("request");
const { URLSearchParams } = require('url');
global.URLSearchParams = URLSearchParams;

exports.handler = async (event, context) => {
    return new Promise((resolve, reject) => {
        request(
            event.queryStringParameters.url,
            (err, res, dat) => {
                if (!err) {
                    resolve({
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Origin": '*',
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
                        },
                        body: dat
                    });
                } else {
                    console.log(err.message);
                    reject(err.message);
                }
            }
        ).on("error", (err) => {
            reject(err.message);
        });
    });
}