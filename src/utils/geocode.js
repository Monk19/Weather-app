const request = require('postman-request')
const geoCode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibW9uazE5IiwiYSI6ImNraHVob21xNzE0M20ycmxoY3dyeHFxN2kifQ.rrcLVJc09ILhLW3JK36Pmw'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to the location provided',undefined)
        } else if (response.body.features.length ===0) {
            callback('unable to find the lication Please try again',undefined)
        } else{
            callback(undefined,{
                latitude:response.body.features[1].center[0],
                longitude:response.body.features[1].center[1],
                location:response.body.query[0]
            })
        }

    })
}
module.exports = geoCode;