const express = require("express")
const clientAPI = express.Router()
const weatherAPI = require("./WeatherAPI")
const cityModel = require("../models/CityModel")


clientAPI.get("/city/:cityName", function (req, res) {
    const cityName = req.params.cityName
    weatherAPI.getWeather(cityName)
        .then(function (data) {
            if(data){
                res.send(data)
            }else{
                res.status(400).send(data)
            }
        })
        .catch(function(error){
            res.status(404).send(false)
        })
})

clientAPI.get("/cities", function (req, res) {
    cityModel.find({})
        .then((data) => res.send(data))
})

clientAPI.post("/city", function (req, res) {

    const newCityModel = new cityModel(req.body)

    cityModel.findOneAndUpdate(
        { name: newCityModel.name },
        {
            temperature: newCityModel.temperature,
            condition: newCityModel.condition,
            conditionPic: newCityModel.conditionPic
        })
        .then(function (data) {
            if (!data) {
                newCityModel.save()
            }
        })
    res.send('All Cool')

})

clientAPI.delete("/city/:cityName", function (req, res) {
    const cityname = req.params.cityName
    cityModel.findOneAndDelete({ name: cityname })
        .then(function (data) {
            res.send("Done")
        })

})


module.exports = clientAPI