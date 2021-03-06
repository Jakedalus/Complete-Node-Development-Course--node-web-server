const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(err);
    });


    next();
}); 

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello express!</h1>');
    // res.send({
    //     name: 'Jake',
    //     age: 36,
    //     likes: ['ny style pizza', 'powerlifting']
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Hey hi hello welcome to my page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Portfolio Page',
        projectsMsg: 'My various projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});