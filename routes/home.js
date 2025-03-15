const express = require('express')
const router = express.Router()


router.get("/" , (req , res) => {
    res.render('home' , {name : "mohamad"})
})


module.exports = router