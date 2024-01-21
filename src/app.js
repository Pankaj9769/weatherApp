const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const port = 8000;


const staticPath = path.join(__dirname,"../public");
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');


hbs.registerPartials(partialPath);
app.set('view engine', 'hbs');
app.set('views', viewPath);

app.use(express.static(staticPath));

app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/about', (req,res)=>{
    res.render('about');
});

app.get('/weather', (req,res)=>{
    res.render('weather');
});

app.get('*', (req,res)=>{
    res.render('error', {
        errorMsg : "Oops! Page Not Found",
    });
});

app.listen(port, ()=>{
    console.log(`Listening at ${port}`);
}); 