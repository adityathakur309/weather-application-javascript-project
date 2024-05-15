let input = document.getElementById("input-field");
let cityName = document.querySelector(".city-name");
let dateTime = document.querySelector(".date-time");
let weatherFoarcast = document.querySelector(".weather-foarcast");
let weatherIcon = document.querySelector(".weather-icon");
let weathertemp = document.querySelector(".weather-temp");
let windSpeed = document.querySelector(".wind-s")
let pressure = document.querySelector(".pressure")
let feelsLike = document.querySelector(".feels-like")
let humidity = document.querySelector(".humidity")


// show data function
let city = "kangra";

let showData = (e) => {
    city = input.value;
    input.value = ""
    getWeatherData();


}

// end 
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    showData(e)
})

let getDate = (date) => {
    let newDate = new Date(date * 1000)
    return new Intl.DateTimeFormat("en-IN", {
        dateStyle: "full",
        timeStyle: "short"
    }).format(newDate)

}




// get data from api 

let getWeatherData = async () => {
    cityName.innerHTML = "Loading...";
    let apiUrl = `http://api.weatherapi.com/v1/current.json?key=a8836314218a4aaeb17160841241405&q=${city}`

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        let { location, current } = data;
        cityName.innerHTML = `${city},${location.country}`
        dateTime.innerHTML = `${getDate(current.last_updated_epoch
        )}`;
        weatherFoarcast.innerHTML = `${current.condition?.text}`
        weatherIcon.innerHTML = `<img src = "http://${current.condition?.icon}">`;
        weathertemp.innerHTML = `${current.temp_c}&deg;C`;
        windSpeed.innerHTML = `${current.wind_kph}kph`;
        feelsLike.innerHTML = `${current.feelslike_c}&deg;C`;
        humidity.innerHTML = `${current.humidity}%`;
        pressure.innerHTML = `${current.pressure_mb}hpa`









    } catch (error) {
        cityName.innerHTML = "api is not fetching"

    }
}
getWeatherData();

// end 

