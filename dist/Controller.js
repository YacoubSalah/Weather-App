class Controllers {
    constructor(cities, renderer) {
        this.cities = cities
        this.renderer = renderer
        this.cityNameInputField = $("#cityNameInputField")
    }
    addListeners = () => {
        $("#getWeatherButton").on("click", () => {
            const cityName = this.cityNameInputField.val()
            this.addNewCity(cityName)
        })

        var controllerThis = this
        $("#citiesContainer").on("click", "i", async function () {
            const cityName = $(this).closest(".cityContainer").find(".name")[0].innerHTML
            switch (this.classList[0]) {
                case 'saveCityButton':
                    controllerThis.saveCityToDB(cityName)
                    $(this).css('color' , 'green')
                    break;
                case 'removeCityButton':
                    await controllerThis.cities.removeCityFromDB(cityName)
                    controllerThis.cities.removeCityLocaly(cityName)
                    break;
            }
            controllerThis.renderer.renderCities()
        })
    }
    saveCityToDB = (name) => {
        const cityData = this.cities.citiesData.find(c => c.name == name)
        this.cities.saveCityToDB(cityData)
    }
    async addNewCity(cityName) {
        await this.cities.getCityData(cityName)
        this.renderer.renderCities()
    }

    async loadPage() {
        await this.cities.getCitiesFromDB()
        this.renderer.renderCities()
    }
}

let cities = new citiesHandler
let renderer = new rendererHandler(cities)
let controller = new Controllers(cities, renderer)

controller.renderer.compileHandleBars()
controller.addListeners()
controller.loadPage()

