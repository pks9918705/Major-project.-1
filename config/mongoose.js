const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/codeial_development')

 
const db = mongoose.connection

db.on('error',function(err) {
    console.log(err.message)
})

db.once('open',function() {
    console.log('SUCCESSFULLY!! Connected to MongoDB')
})

// TO MAKE THIS MODULE EXPORTS 
module.exports = db
