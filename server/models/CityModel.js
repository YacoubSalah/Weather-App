const mongoose = require("mongoose")
const Schema = mongoose.Schema

let weatherSchema = new Schema({

    name : String,
    temperature : Number,
    condition : String,
    conditionPic: String

})

const cityModel = mongoose.model("Weather" , weatherSchema)

module.exports = cityModel