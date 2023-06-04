const { hasSubscribers } = require('diagnostics_channel')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { query } = require('express')
const request = require('postman-request')
const forecast = require('./utils/forecast')

const PORT = process.env.Port || 3000
const app = express()

const publicDirectoryPath = path.join(__dirname , '../public')
const viewPath =path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialsPath)

app.get('/weather' , (req,res) => {

    if(!req.query.adress)  {
        return res.send({
            error : 'You must provide an adress !'
        })
    }
        forecast(req.query.adress, (error , forecastData , location) => {

            if(error) {
                return res.send({error})

            }

            res.send({
                forecast : forecastData ,
                adress : req.query.adress,
                location
            })
        })
})


app.get('' , (req , res) => {
    res.render('index' , {
        title : 'Weather App' ,
        name : 'Adnan Yazik'
    })
})

app.get('/about' , (req , res) => {
    res.render('about', {
        title : 'About me ' ,
        name : 'Adnan Yazik'
    })
})

app.get('/help' ,(req,res) => {
    res.render('help' , {
        title : 'Help page'
        , helpText : 'Helpful text' ,
        name : 'Adnan Yazik'
    })
})

app.get('/help/*' ,(req,res) => {
    res.render('404' , {
        title : '404'
        , errorMessage : 'Help Article not found' ,
        name : 'Adnan Yazik'
    })
})

app.get('*' , (req,res) => {
    res.render('404', {
        errorMessage : 'Page not found' ,
        title : '404',
        name : 'Adnan Yazik'
    })
})





app.listen(PORT , () => {
    console.log('Server is up on port 3000')
})