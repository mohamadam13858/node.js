const express = require('express')
let users = require('./users')

const app = express();


app.get('/api/users', (req, res) => {
    res.json(
        {
            data: users,
            message: "ok"
        }
    );
})

app.get('/api/users/:id', (req, res) => {
   const Users = users.find(u=>u.id === parseInt(req.params.id))
   if (Users) {
       res.json({
        data: Users,
        message: "ok"
       })
   }else{
    res.json({
        data:null,
        message: 'the user with the given id was not found'
    })
   }
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));






