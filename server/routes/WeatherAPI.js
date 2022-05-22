const axios = require("axios")
const alertMessages = require("../../AlertMessages")
const picToIcon = require("./PicToIcon")

const apiKey = "693ec6a46b11c3291c5e1c4921da329e"

const getWeather = async function (cityName) {

    let cityLat, cityLon
    const cityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
    let cityCoordsPromis = await axios.get(cityURL)
        .then(function (response) {
            cityLat = response.data[0].lat
            cityLon = response.data[0].lon
            return "OK"
        })
        .catch(function (error) {
            return "Bad"
        })

    if (cityCoordsPromis == "Bad") {
        return false
    }

    let cityWeatherData = {}
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=metric`
    let weatherDataPromise = await axios.get(weatherURL)
        .then(function (response) {
            cityWeatherData.name = cityName
            cityWeatherData.temperature = response.data.main.temp
            cityWeatherData.condition = response.data.weather[0].main
            cityWeatherData.conditionPic = picToIcon[response.data.weather[0].icon]
            return "OK"
        })
        .catch(function (error) {
            return "Bad"
        })

    if (weatherDataPromise == "Bad") {
        return false
    } else {
        return cityWeatherData
    }
}

module.exports.getWeather = getWeather