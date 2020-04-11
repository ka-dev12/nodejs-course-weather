const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWthZHkiLCJhIjoiY2s4czhnNGVkMDdvbTNnbWNmOWh3bnJoZSJ9.iKliL8v2a4zEkXP7vJkiZA&limit=1`

    request({url, json: true}, (err, res) => {
        if (err) {
            callback('Unable to connect to services.', undefined)
        } 
        else if (res.body.features.length == 0) {
            callback('Location not found')
        } 
        else {
            const longitude = res.body.features[0].center[0]
            const latitude = res.body.features[0].center[1]
            const location = res.body.features[0].place_name

            callback(undefined, {
                longitude,
                latitude,
                location
            })
        }
    })
}   

module.exports = geocode