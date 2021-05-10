require('dotenv').config()
const express = require('express')
const app = express()
const expHbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const myStore = new session.MemoryStore()
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const port = process.env.PORT || 5000
const campRouter = require('./routes/camp')
const userRouter = require('./routes/user')
const campgroundsRouter = require('./routes/campgrounds')
const {seedDB} = require("./seed")

const {DATABASE_URL} = process.env

app.use(session({
    secret: "%^TGY^%TRF5$RFT5r$Rftr5$t%$rt5t5rT%rr5$r4$rRT$Er4Rrf",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 9000000
    },
    store: myStore
}))

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if (err) throw err

    // seedDB()

    console.log('Connected')
})

app.engine('hbs', expHbs({ extname:'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

app.use('/campgrounds', campRouter)
app.use('/', userRouter)
app.use('/', campgroundsRouter)

app.get('/', (req,res) => {
    res.render('landing')
})

app.get('/landing', (req,res) => {
    res.redirect('/')
})

app.listen(port, () => {
    console.log("Server Started")
})