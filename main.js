const temp = document.querySelector(".temp");
const city = document.querySelector(".name");
const timeHtml = document.querySelector(".time");
const dateHtml = document.querySelector(".date");
const icon = document.querySelector(".icon");
const condition = document.querySelector(".condition");
const cloudy = document.querySelector(".cloud");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const app = document.querySelector(".weather-app");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");
const form = document.querySelector("#locationInput");
const search = document.querySelector(".search");

var defaultCity = "London";

cities.forEach((city) => {
    city.addEventListener("click", (e) => {
        defaultCity = e.target.innerHTML;

        fetchWeatherData();

        app.style.opacity = "0";
    });
});

form.addEventListener("submit", (e) => {
    if (search.value.length == 0) {
        alert("Please type in a city name");
    } else {
        defaultCity = search.value;

        fetchWeatherData();

        search.value = "";

        app.style.opacity = "0";
    }

    e.preventDefault();
});

function dayOfTheWeek(d, m, y) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return weekday[new Date(`${d}/${m}/${y}`).getDay()];
}

function fetchWeatherData() {
    fetch(
        `http://api.weatherapi.com/v1/current.json?key=18601cf75d8c47e48ac111720220708&q=${defaultCity}&aqi=no`
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176;";
            city.innerHTML = data.location.name;

            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);

            dateHtml.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
            timeHtml.innerHTML = time;

            icon.src = data.current.condition.icon;

            condition.innerHTML = data.current.condition.text;

            cloudy.innerHTML = data.current.cloud + "%";
            wind.innerHTML = data.current.wind_kph + "km/h";

            let timeOfDay = "day";

            const code = data.current.condition.code;

            if (!data.current.is_day) {
                timeOfDay = "night";
            }

            if (code == 1000) {
                app.style.backgroundImage = `url(assets/${timeOfDay}/clear.jpg)`;

                btn.style.background = "#e5ba92";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            } else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = `url(assets/${timeOfDay}/cloud.jpg)`;

                btn.style.background = "#fa6d1b";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            } else if (
                code == 1863 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `url(assets/${timeOfDay}/rain.jpg)`;
                if (timeOfDay == "night") {
                    btn.style.background = "#325c80";
                }
            } else {
                app.style.backgroundImage = `url(assets/${timeOfDay}/snow.jpg)`;
                btn.style.background = "#4d72aa";
                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            app.style.opacity = "1";
        })

        .catch(() => {
            alert("City not found, please try again");
        });
}

fetchWeatherData();

app.style.opacity = "1";
