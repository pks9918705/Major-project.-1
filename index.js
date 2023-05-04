//? entery point of web application
const express = require('express')
const app = express()
const port = 8000

//----------------------------------------------------------------
                //express-ejs-layouts lib
//----------------------------------------------------------------
const expressLayouts = require('express-ejs-layouts')

app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts)

// ----------------------------------------------------------------
                    // using static file in application
// ----------------------------------------------------------------
// telling the app to use css/img/js/fonts files from assets  folder
app.use(express.static('./assets'))

//extract style and scripts from sub-pages and add them to head of layout.ejs
app.set('layout extractStyles',  true)
app.set('layout extractScript',  true)

//----------------------------------------------------------------
                        // adding mongoose.js 
//----------------------------------------------------------------
const db=require('./config/mongoose')
// above code will go to mongoose.js and that file

 
 //----------------------------------------------------------------
                        //using cookie-parser 
//----------------------------------------------------------------
// for reading and writing into cookies
const cookieParser = require('cookie-parser')

app.use(cookieParser())



//----------------------------------------------------------------
                        //use express Router
//----------------------------------------------------------------

app.use('/',require('./routes'))

//----------------------------------------------------------------
                        //set up the view engine
//----------------------------------------------------------------

app.set('view engine', 'ejs')
app.set('views','./views')



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
