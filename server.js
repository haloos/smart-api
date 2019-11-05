const express = require('express'); 
const bodyParser = require('body-parser'); 
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors'); 
const knex = require('knex') 

const register = require('./controllers/register'); 
const signin = require('./controllers/signin'); 
const profile = require('./controllers/profile'); 
const image = require('./controllers/image');
  
  const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'jason',
    password : '',
    database : 'smart-brain'
  }
}); 


const app = express();  

app.use(bodyParser.json()); 

app.use(cors()) 



app.get('/', (req, res)=> {
 res.send(database.users); 
})

app.post('/signin', (req, res,) => { signin.handleSignin(req, res, db, bcrypt)}) 
        .catch(err => res.status(400).json('wrong credentials'))
  

app.post('/register', (req,res) => { 
  const { email, name, password } = req.body; 
  const hash = bcrypt.hashSync(password); 
  db.transaction(trx => {
    trx.insert({
      hash:hash, 
      email: email
    }) 
    .into('login') 
    .returning('email') 
    .then(loginEmail => {
      return trx('users') 
        .returning('*')
        .insert({ 
            email: loginEmail, 
            name: name, 
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      }) 
      .then(trx.commit) 
      .catch(trx.rollback)
  }) 
  .catch(err => res.status(400).json('unable to register'))
  return db('users') 
   .returning('*')
   .insert({ 
      email: email, 
      name: name, 
      joined: new Date()
    })
  .then(user => {
    res.json(user[0]);
  })
  .catch(err => res.status(400).json('unable to register'))
})  

app.get('/profile/:id', )

app.put('image', (req, res) => { image.handleImage(req, res, db)})
/* 
/ --> res = this is workig 
/ signin --> Post = success/fail 
/ register --> POST = user  
/ profile/:userId --> GET = user 
/ image --> PUT --> user 
*/