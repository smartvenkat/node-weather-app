const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express configurations
const publicDIrectoryPath =  path.join(__dirname ,'../public')
const viewpath = path.join(__dirname , '../templates/views')
const partialspath = path.join(__dirname , '../templates/partials')

// console.log(__dirname)
// console.log(path.join(__dirname ,'../public'))

//Setup handlebars engine and views location
app.set('view engine' , 'hbs')
app.set('views' , viewpath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicDIrectoryPath))

app.get( '' , (req , res) => {
    res.render('index' , {
        title : 'weather',
        name : 'venkat ramana'
    })
})

app.get( '/help' , (req , res) => {
    res.render('help', {
        helptext : 'this is some helpful text' ,
        title : 'help' ,
        name : 'venkat ramana'
     })
})

app.get( '/about' , (req , res) => {
    res.render('about' , {
        title : 'About ME',
        name : 'venkat ramana'
    } )
})

app.get( '/weather' , (req , res) => {
    if(!req.query.address) {
        return res.send({
            error : 'please provide the address!!!'
        })
    }
  
    geocode( req.query.address , (error , {latitude , longitude , location } ={} ) => {
        if (error) {
                return res.send({error})
            }

            weather(latitude , longitude ,(error , weatherdata) =>{
                if (error) {
                    return res.send({error})
                }
                
                res.send({
                    weather : weatherdata ,
                    location ,
                    address : req.query.address
                })
            })
        })
    // res.send({
    //     address : 'Adoni ' ,
    //     forecast : 'have a nice day'
    // })
})

app.get( '/products' , (req ,res) => {
    if (!req.query.search){
        return res.send({
            error : 'please provide the search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        product : []
    })
})

app.get( '/help/*' , (req , res) => {
    res.render('page404' , { 
        error : 'help article not found',
        title : '404' ,
        name : 'venkat ramana' ,
    })
})

app.get( '*' , (req , res) => {
    res.render('page404' , { 
        error : 'pagenot found',
        title : '404' ,
        name : 'venkat ramana' ,
    })
})

app.listen( port , () => {
    console.log('running is up on port' + port)
})