const express = require('express'); 
const bodyParser = require('body-parser'); 

app.use(bodyParser.json());
const app = express();  

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
 res.send('this is working'); 
})

app.post('/signin', (req, res) => {
  res.json('signing')
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