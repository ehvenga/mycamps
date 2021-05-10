const express = require('express')
const router = express.Router()
// const fileUpload = require('express-fileupload')
const CampModel = require('../models/Camp')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const path = require('path')

router.use(express.urlencoded({extended: false}))

router.get('/new', (req, res) => {
    // if (req.session.isLoggedIn === true) {
    //     res.render('newcampground')
    // }
    res.render('newcampground')
})

router.post('/new', upload.single('image') ,async (req, res) => {

    let data = {
        name : req.body.name,
        price: req.body.price,
        location : req.body.location,
        image : {
                data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
                contentType: 'image/png'
        },
        description : req.body.description,
        createAt : Date.now
    }

    try {
        const newCampDoc = new CampModel(data)
        const savedCampDoc = await newCampDoc.save()
        res.redirect('/campgrounds')
    } catch (error) {
        console.log(error)
        res.send(`Internal Error Occurred: ${error._message}`)
    }
    
})

module.exports = router