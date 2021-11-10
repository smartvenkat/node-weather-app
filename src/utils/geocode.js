const request = require ( "request" )

const geocode = ( address , callback ) => {

    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoidmVua2F0LWVjZSIsImEiOiJja3Zta3R6MzQxbHZpMm5tdHFoZnZkZDg3In0.oVS2X5qKwLPtJ7zAgXhxpA"

    request( {url  , json : true } , (error , { body }) => {
        if (error) {
            callback('unable to connect to the server , please check your network connection!!! ' , undefined)
        } else if (body.features.length === 0) {
            callback('unable to find the location , please check the location!!!' , undefined)
        } else {
            callback(undefined , {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })

}

// geocode( 'Hyderabad' , (error , data) => {
//     console.log(' error ' , error )
//     console.log(' data ' , data )
// })

module.exports = geocode