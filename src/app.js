const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3001;

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
console.log(__dirname);
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('views',viewsPath);
app.set('view engine', 'hbs');
//seup static directory to serve
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);
app.get('',(req,res)=>{
    res.render("index",{
        title: 'Weather',
        name: 'AYUSHBG'
    });
});
app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'about us',
        name: 'AYUSHBG'
    });
});
// app.get('',(req,res)=>{
//     res.send("Hello express");
// });
app.get('/tuesday',(req,res)=>{
    res.send("Need beer");
});
app.get('/about1',(req,res)=>{
    res.send("abut page");
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must enter the address'
        }); 
    }else{
        geocode(req.query.address,(error , {latitude, longitude, location} = {}) => {
            forecast(latitude,longitude ,(error , forecastdata) => {
                if(error){
                    return res.send({error}); 
                }
                res.send({
                    data: forecastdata,
                    location
                });
            });     
        });
    }
});

app.get('/product',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'please provide search parameter'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title:'404',
        name: 'AYUSHBG',
        errorMessage: 'Help Page Not Found'
    });
});

app.get('*',(req,res) => {
    res.render('404', {
        title:'404',
        name: 'AYUSHBG',
        errorMessage: 'Page Not Found'
    });
});

app.listen(port,()=>{
    console.log("Webserver is on port" + port);
});