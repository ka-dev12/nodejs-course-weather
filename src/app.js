const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define path for express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// use static
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Eka"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'About Nug'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help page',
        name: 'Help Nug'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            err: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if (err) {
            return res.send({err})
        }
    
        forecast(latitude, longitude, (error, {temp, clouds}) => {
            if (error) {
                return res.send({error})
            }
            res.send([{
                location,
                temp,
                clouds
            }])
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            err: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article Not Found',
        name: 'Eka',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'Eka',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')    
})