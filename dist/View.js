class rendererHandler{
    constructor(cities){
        this.cities = cities
        this.weatherTemplate = ""
        this.citiesContainer = $("#citiesContainer")
    }
    compileHandleBars(){
        const weatherTemplateHTML = $("#weatherTemplate").html()
        this.weatherTemplate = Handlebars.compile(weatherTemplateHTML)
    }
    renderCities(){
        const citiesHTML = this.weatherTemplate({cities : this.cities.citiesData})
        this.citiesContainer.empty()
        this.citiesContainer.append(citiesHTML)
    }
}