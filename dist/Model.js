class citiesHandler {
    constructor() {
        this.citiesData = []
    }

    async getCitiesFromDB() {
        let citiesfromDB = await $.get('/cities')
        citiesfromDB = citiesfromDB.map(c => {
            return {
                "name": c.name,
                "temperature": c.temperature,
                "condition": c.condition,
                "conditionPic": c.conditionPic
            }
        })
        citiesfromDB.forEach(c => this.addCityToCitiesData(c))
    }

    getCityData = async (cityName) => {
        await $.get(`/city/${cityName}`)
            .then((Data) => {
                this.addCityToCitiesData(Data)
                return "OK"
            })
            .catch(function (error) {
                alert(`Couldn't get weather data for city name: ${cityName}`)
                return "Bad"
            })
    }

    addCityToCitiesData(city) {
        const localCityIndex = this.citiesData.findIndex(localCity => localCity.name == city.name)
        if (localCityIndex >= 0) {
            this.citiesData.splice(localCityIndex, 1)
        }
        this.citiesData.push(city)
    }

    saveCityToDB(city) {
        $.post("/city", city)
    }

    async removeCityFromDB(cityName) {
        let deletePromise = await $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
        })
        return deletePromise
    }

    removeCityLocaly(cityName) {
        const cityIndex = this.citiesData.findIndex(c => c.name == cityName)
        this.citiesData.splice(cityIndex, 1)
    }

}