const mongoose = require('mongoose');
const mongooseURI = "mongodb://localhost:27017/INotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () => {
    mongoose.connect(mongooseURI, () =>{
        console.log('connect to mongo successfully !');
    })
}

module.exports = connectToMongo;