const express = require('express')
let users = require('./users')
const app = express();
const { body, validationResult } = require('express-validator')
const helment = require('helmet')
const morgan = require('morgan')
const config = require('config')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helment())
console.log("appilocation name:" , config.get("name"))
console.log("appilocation version:" , config.get("version"))
console.log("sms:" , config.get("sms"))



if (app.get('env') === 'development') {
    console.log('morgan is active');
    app.use(morgan('tiny'))
}


app.get('/api/users', (req, res) => {
    res.json(
        {
            data: users,
            message: "ok"
        }
    );
})

   

app.get('/api/users/:id', (req, res) => {
    const Users = users.find(u => u.id === parseInt(req.params.id))
    if (Users) {
        res.json({
            data: Users,
            message: "ok"
        })
    } else {
        res.status(404).json({
            data: null,
            message: 'the user with the given id was not found'
        })
    }
})


app.post('/api/users', [
    body('email', 'email must be valid').isEmail(),
    body('first_name', 'first name cant be empty').notEmpty(),
    body('last_name', 'last name cant be empty').notEmpty(),
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ data: null, errors: errors.array(), message: "validation error" })
    }
    users.push({ id: users.length + 1, ...req.body })
    res.json({
        data: users,
        message: "ok"
    })
})



app.put('/api/users/:id', [
    body('email', 'email must be valid').isEmail(),
    body('first_name', 'first name cant be empty').notEmpty(),
    body('last_name', 'last name cant be empty').notEmpty(),
], (req, res) => {
    const user = users.find(u => u.id == req.params.id)
    if (!user) {
        return res.status(404).json({
            data: null,
            message: "the user with the given id was not"
        })
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ data: null, errors: errors.array(), message: "validation error" })
    }
    users = users.map(user => {
        if (user.id == req.params.id) {
            return { ...user, ...req.body }
        }
        return user
    })
    res.json({
        data: users,
        message: "ok"
    })
})
app.delete("/api/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id)
    if (!user) {
        return res.status(404).json({
            data: null,
            message: "the user with the given id was not found"
        })
    }
    const index = users.indexOf(user)
    users.splice(index, 1)
    res.json({
        data: users,
        message: "ok"
    })
})

console.log('NODE_ENV: ', process.env.NODE_ENV);
console.log(app.get('env'));



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));






