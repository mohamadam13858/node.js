const express = require('express')


const app = express();



app.get('/api/users' , (req , res)=>{
  res.send([
    {id: 1 , name: 'user1'},
    {id: 2 , name: 'user2'},
  ])
})
app.get('/api/users/:id' , (req , res)=>{
    res.send({id: req.params.id , name: `user${req.params.id}`})    
})

const port = process.env.PORT || 3000;

app.listen(port , ()=>{
    console.log(`listening on port ${port}`);
    
})



