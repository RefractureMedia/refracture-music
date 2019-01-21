const request = require('request');
const fs = require('fs')

export function uploadToDrive(authToken, url) {
    request(url).pipe(request.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=media').auth(null, null, true, authToken))
}