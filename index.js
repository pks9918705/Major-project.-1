//? entery point of web application
const express = require('express')
const app = express()
const port = 8000





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
