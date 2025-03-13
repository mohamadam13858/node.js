const express = require('express')
let users = require('./users')
const app = express();
const { body, validationResult } = require('express-validator')
app.use(express.json())


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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));






