const request = require('postman-request')

const forecast = (adress , callback ) => {

    const url = 'http://api.weatherstack.com/current?access_key=4999b7b526f18e948a3eb25b70cce35d&query='+ adress + '&units=m'
    request({url : url , json : true}, (error , response) => {
            if(error) {
        callback('Unable to connect to weather services!' , undefined)
    } else if (response.body.error) {
        callback('Unable to find Location!' ,undefined)
    }else {

        const data = response.body.current
        callback( undefined , data.weather_descriptions[0] + " . It is currently " + data.temperature + " degrees out. It feels like " + data.feelslike + " degrees out" , response.body.location.name)
    

    }
    })

}

module.exports = forecast