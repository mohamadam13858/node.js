const express = require('express')


const app = express();



app.get('/api/users' , (req , res)=>{
  res.send([
    {id: 1 , name: 'user1'},
    {id: 2 , name: 'user2'},
  ])
})

app.listen(3000 , ()=>{
    console.log('listening on port 3000');
    
})

