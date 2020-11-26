const path = require('path')
const express = require('express');
const app = express()
const hbs = require('hbs')
const port = 3000
const request = require('postman-request')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')
const publicDirectory = path.join(__dirname,'../public') //absolute path to src file using path module
const viewsDirectory = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')//setting an template engine (handle bars)
app.set('views',viewsDirectory)
app.use(express.static(publicDirectory))
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('home',{name:'Weather'})
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            Error:"You must provide and address"
        })
    }
    geoCode(req.query.address,(error,{latitude,longtitude,location})=>{ 
        if(error){
            return res.send({error})
        }
        foreCast(latitude,longtitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,location,
                address:req.query.address
            })
        })
    })

    // res.render('weather',{name:"To display ForeCast Data"})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About the template engine and app.set',name:'HUMBLE_FOOL'})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:'This is the help content',name:'MiCRO_MANAGER'})
    
})
app.get('*',(req,res)=>{
    res.render('notfound',{name:':( 404 PAGE NOT FOUND..!'})
})
app.get('help/*',(req,res)=>{
    res.render('notfound',{name:':( 404 PAGE NOT FOUND..!'})
})
 
app.listen(3000,()=>{
    console.log(`Server is up and running http://localhost:${port}`)
})