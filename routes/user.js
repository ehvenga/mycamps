const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')


const UserModel = require('../models/User')

// router.use(session({
//     store: MongoStore.create({ mongoUrl: 'mongodb+srv://ehvenga:coding-challenge@coding-challenge.rte9h.mongodb.net/yelpcamp'}),
//     secret: "%^TGY^%TRF5$RFT5r$Rftr5$t%$rt5t5rT%rr5$r4$rRT$Er4Rrf",
//     resave: false,
//     saveUninitialized: false
// }))

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req,res) => {

    const {email, password} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    passcode = hashedPassword

    userData = {
        email,
        passcode,
    }

    userLogged = {
        'email':email,
    }

    try {
        const newUserDoc = new UserModel(userData)
        const savedUserDoc = await newUserDoc.save()
        req.session.isLoggedIn = true
        req.session.user = userLogged
        res.redirect('/campgrounds')
    } catch (error) {
        console.log(error)
        res.send(`Internal Error Occurred: ${error._message}`)
    }
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', async (req,res) => {

    const {email, password} = req.body

    userLogged = {
        'email':email,
    }

    try {
        const returnUser = await UserModel.findOne({'email':`${email}`})
        if (returnUser != null){
            const isMatching = await bcrypt.compare(password, returnUser.passcode)
            if (isMatching) {
                req.session.isLoggedIn = true
                req.session.user = userLogged
            }
        }
        else{
            console.log('User Not Found')
            res.send('User Not Found')
        }
    } catch (error) {
        console.log(error)
        res.send(`Internal Error Occurred: ${error._message}`)
    }


    res.redirect('/campgrounds')
})



module.exports = router