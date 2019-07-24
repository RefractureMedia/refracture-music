const express = require('express')
const cors = require('cors')
const app = express()
const port = 25259
const request = require('request')
const parseurl = require('url-parse')

const allowedOrigins = ['http://localhost:8080', 'http://refracturemusic.netlify.com'];

app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
            if(allowedOrigins.indexOf(origin) === -1){
            return callback(`[UR] - ${parseurl(origin).host}`, false);
        }
        return callback(null, true);
    }
  }));

app.get('/', (req, response) => {
    console.log(`[RR] - ${parseurl(decodeURIComponent(req.originalUrl.split('request=')[1])).host}`)
    request(`${decodeURIComponent(req.originalUrl.split('request=')[1])}`, {}, (err, res, dat) => {
        if (err) {
            console.error(`[RE] - ${parseurl(decodeURIComponent(req.originalUrl.split('request=')[1])).host} - ${err}`)
            response.send(`${err}`)
        } else {
            console.log(`[RS] - ${parseurl(decodeURIComponent(req.originalUrl.split('request=')[1])).host}`)
            response.send(`${dat}`)
        }
    })
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Error: ', err)
    }

    console.log(`Refracture Music Clientside NRS started on ${port}`)
})