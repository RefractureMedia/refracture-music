exports.handler = (event, context, callback) => {
    callback(null, { statusCode: 200, body: JSON.stringify({ results: event.queryStringParameters.search }) });
}