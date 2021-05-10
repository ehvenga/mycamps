const express = require('express')
const router = express.Router()

router.get('/campgrounds', (req,res) => {
    res.render('campgrounds')
})

router.post('/campgrounds', (req,res) => {
    res.render('campgrounds')
})

module.exports = router