const request = require('request');
const fs = require('fs')
const auth = "4/1AANrkS4sCnWd09ohWU-fzhAgrAb29BpTc7KQhPr3OR7g6jfhy8DwlDYrfTnZXZcd7_-6rPd9DAQGcLd4vu_FSY"

export function uploadToDrive(authToken, url) {
    request(url).pipe(request.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=media').auth(null, null, true, authToken))
}