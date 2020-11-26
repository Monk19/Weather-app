const request = require('postman-request')
const forecast= (latitude,longtitude,callback)=>{
    url  = 'http://api.weatherstack.com/current?access_key=b643d614920874c692547f2726355e10&query='+longtitude+','+latitude+'&units=m'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to load the forecast',undefined)
        } else if(response.body.error){
            callback(response.body.error,undefined)
        } else{
            callback(undefined,`${response.body.current.temperature},${response.body.current.feelslike}`)
        }
    })
}

module.exports = forecast
