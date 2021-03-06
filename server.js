const nr = require('newrelic');

const express = require('express');

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt-nodejs');

const cors = require('cors');

const knex = require('knex');

const register = require('./controllers/register');

const signin = require('./controllers/signin');

const profile = require('./controllers/profile');

const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

//console.log(db.select('*').from('users'));


const app = express();
app.use(bodyParser.json());
app.use(cors());



const database = {
    users: [
        {
            id: '123',//
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            has: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res)=> {
    res.send('it si working');
})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} )

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res)})

app.post('/signin', signin.handleSignin(db, bcrypt))



app.listen(process.env.PORT || 3000, ()=> {
    console.log(`App is running on port ${process.env.PORT}`);
})