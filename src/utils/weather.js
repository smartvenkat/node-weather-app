const request = require ( "request" )

const weather = ( latitude , longitude , callback ) => {
''
    const url ="https://api.weatherapi.com/v1/forecast.json?key=44de28305c1c4f59957171220210411&q="+latitude+","+longitude

    request( {url  , json : true } , ( error , { body} ) => {
        if (error) {
            callback('unable to connect to server , please check the network connection!!!' , undefined)
        } else if (body.error) {
            callback(' unable to find the location , please check the location!!!' , undefined)
        } else {
            callback(undefined , ' time is ' +body.location.localtime +' and the temperature is ' +body.current.temp_c +'degree celsius , feels like ' + body.current.condition.text + ' outside')
        }
    })
}

module.exports = weather