const express = require('express');
const path = require('node:path');
const MyApp = express();
const port = 5000;

// Setting Database


// Setting views Template
MyApp.set('view engine', 'pug');
MyApp.set('views', path.join(__dirname, 'views'));

// App
MyApp.get('/', (req, res) => {
    res.render('template', {
        title: 'API Project GK',
        message: 'Welcome to my API Project!'
    });
});

MyApp.post('/submit-form',(req, res) => {
    res.send('Form submitted!');
});

MyApp.use((req, res, next) => {
    console.log(`${req.method} request made to ${req.url}`);
    next();
});

MyApp.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});