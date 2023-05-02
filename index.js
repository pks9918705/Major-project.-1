//? entery point of web application
const express = require('express')
const app = express()
const port = 8000

//use express Router
app.use('/',require('./routes'))

//set up the view engine
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
