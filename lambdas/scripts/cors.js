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
                            "Access-Control-Allow-Origin": '*'
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