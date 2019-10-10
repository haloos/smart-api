const express = require('express'); 
const bodyParser = require('body-parser'); 
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors'); 
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
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
  database.users.push({
    id: '125', 
    name: 'name', 
    email: 'email',  
    password: 'password', 
    entries: 0, 
    joined: new Date()
  }) 
  res.json(database.users[database.users.length-1])
})  

app.get('/profile/:id', (req,res) => {
  const { id } = req.params;  
  database.users.forEach(user => {
    if (user.id === id) {
      res.json(user); 
    } else {
      res.status(404).json('no such user'); 
    }
  }) 
})

app.listen(3000, ()=> {
  console.log('app is running on port 3000'); 
})   

/* 
/ --> res = this is workig 
/ signin --> Post = success/fail 
/ register --> POST = user  
/ profile/:userId --> GET = user 
/ image --> PUT --> user 
*/