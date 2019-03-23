const path = require('path');
const express = require('express');
const hbs = require('hbs');
// const  weather = require('./geocode_weather.js');
const temp = require('./app-promise-weather.js');


// USING EXPRESS
const app = express()

// PATHS
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

// Configering handlebars
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);


// setting up static site
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name : 'Wahab Ahmad'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me', 
        name: 'Wahab Ahmad'
    })
})

app.get('/help',(req, res) =>{
    res.render('help', {
        title: 'Help Page',
        name: 'Wahab Ahmad',
        helpText: 'This is some helpful text'
    })
    
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Address not specified"
        })
    }

    temp.geocode(req.query.address).then(
        result=>{
            if(result==="error"){
                return res.send({error: "An error has occurred"})
            }
            res.send({
                address: req.query.address,
                temperature: result.temperature,
                apparentTemprature: result.apparentTemprature
            })
            
        }
    )
})

app.get('/login', (req, res)=>{
    res.send('<h1>Login page</h1>')
})

app.get('/help/*', (req, res)=>{
    res.render('help404',{
        title: "Error",
        errorMessage: 'Help article not found',
        name: "Wahab Ahmad"
    });
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: "Error",
        errorMessage: 'Page not found',
        name: "Wahab Ahmad"
    });
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000.');
})