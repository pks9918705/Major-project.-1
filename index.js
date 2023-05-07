//? entery point of web application
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const port = 8000
//----------------------------------------------------------------
// adding mongoose.js 
//----------------------------------------------------------------
const db = require('./config/mongoose')
// above code will go to mongoose.js and that file


//----------------------------------------------------------------
//used for session cookie
//----------------------------------------------------------------

const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')

//----------------------------------------------------------------
//monostore
//----------------------------------------------------------------
const MongoStore = require('connect-mongo')(session)
//session is passes in parameter becuase you need to save session info in database

app.use(express.urlencoded({ extended: true }));
//----------------------------------------------------------------
//using cookie-parser 
//----------------------------------------------------------------
// for reading and writing into cookies
app.use(cookieParser())

 
//----------------------------------------------------------------
//express-ejs-layouts lib
//----------------------------------------------------------------
const expressLayouts = require('express-ejs-layouts')
app.use(expressLayouts)

// ----------------------------------------------------------------
// using static file in application
// ----------------------------------------------------------------
// telling the app to use css/img/js/fonts files from assets  folder
app.use(express.static('./assets'))

//extract style and scripts from sub-pages and add them to head of layout.ejs
app.set('layout extractStyles', true)
app.set('layout extractScript', true)

 

//----------------------------------------------------------------
//set up the view engine
//----------------------------------------------------------------

app.set('view engine', 'ejs')
app.set('views', './views')

 


const dblink='mongodb://localhost/codeial_development'

//mongostore is used to store session cookie in db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployement in production mode
    secret: 'blahsomething',
    resave: false,
    saveUninitialized: false,
    cookie: {

        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: MongoStore.create(
        {
            mongoUrl:dblink,
            autoRemove:'disabled',
             
        } ,
        function(err){
            console.log(err || 'connect mongodb setup ok');
            
        }
    )

}))

app.use(passport.initialize())
app.use(passport.session())

// app.use(passport.checkAuthentication);
app.use(passport.setAuthenticatedUser);




//----------------------------------------------------------------
//use express Router
//----------------------------------------------------------------

app.use('/', require('./routes'))




//----------------------------------------------------------------
// listen on port
//----------------------------------------------------------------
app.listen(port, (err) => {
    if (err) {
        return console.log(`something bad happened: err`)
    }
    console.log(`server is listening on ${port}`)

}
)
