const express = require('express'); 
const bodyParser = require('body-parser'); 
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors'); 
const knex = require('knex')
  
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

const database = {
  users: [
    {
      id: '123', 
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
      password: 'bananas', 
      entries: 0, 
      joined: new Date()
    }
  ]
}

app.get('/', (req, res)=> {
 res.send(database.users); 
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
    res.json('success');
      } else {
        res.status(400).json('error loggin in'); 
   }
})  

app.post('/register', (req,res) => { 
  const { email, name, password } = req.body; 
  const hash = bcrypt.hashSync(password); 
  db.transaction(trx => {
    trx.insert({
      hash:hash, 
      email: email
    })
  })
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

app.get('/profile/:id', (req,res) => {
  const { id } = req.params;  
  db.select('*').from('users').where({id})
    .then(user => { 
    if (user.length) {
      res.json(user[0])
    } else {
      res.status(400).json('Not found')
    }
    
  }) 
  .catch(err => res.status(400).json('error getting user'))
})

app.put('image', (req, res) => {
  const { id } = req.body; 
   db('users').where('id', '=', id)
  .increment('entries', 1) 
  .returning('entries') 
  .then(entries => {
    res.json(entries[0]);
  })
})  
.catch(err => res.status(400).json('unable to get entries'))

/* 
/ --> res = this is workig 
/ signin --> Post = success/fail 
/ register --> POST = user  
/ profile/:userId --> GET = user 
/ image --> PUT --> user 
*/