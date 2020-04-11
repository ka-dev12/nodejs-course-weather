const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=d49d613512b7f7ff7afba6e6812e2c79`

    request({url, json: true}, (err, res) => {
        if (err) {
            callback('Unable to connect.', undefined)
        }
        else if (res.statusCode == 400) {
            callback('Unable to find forecast', undefined)
        }
        else {
            const {temp, clouds} = res.body.current

            callback(undefined, {
                temp,
                clouds
            })
        }
    })
}

module.exports = forecast