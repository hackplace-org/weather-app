const city = sessionStorage.getItem("city");
const units = sessionStorage.getItem("units");

document.getElementById("city").textContent = city;

const weatherData = sessionStorage.getItem("weatherData");
const data = JSON.parse(weatherData);

const textContent = {
	country: [`(${data.sys.country})`, "", ""],
	description: [data.weather[0].description, "", ""],
	cloudiness: [data.clouds.all, "%", "%"],
	wind_direction: [data.wind.deg, "°", "°"],
	wind_speed: [data.wind.speed, " m/s", " mph"],
	visibility: [(data.visibility / 1000).toFixed(2), " km", " km"],
	humidity: [data.main.humidity, "%", "%"],
	temperature: [data.main.temp, "°C", "°F"],
	feels_like: [data.main.feels_like, "°C", "°F"],
	pressure: [data.main.pressure, " hPa", " hPa"],
};

for (const key in textContent) {
	const value = textContent[key];
	const unit = units === "metric" ? value[1] : value[2];

	document.getElementById(key).textContent = value[0] + unit;
}

function timeFromUTC(seconds) {
	return new Date(seconds * 1000).toLocaleString();
}

function timezoneOffset(secondsFromUTC) {
	const offsetHours = Math.floor(secondsFromUTC / 3600);
	const offsetSign = offsetHours >= 0 ? "+" : "-";

	return `UTC${offsetSign}${Math.abs(offsetHours)}`;
}

document.getElementById("sunrise").textContent = timeFromUTC(data.sys.sunrise);
document.getElementById("sunset").textContent = timeFromUTC(data.sys.sunset);
document.getElementById("timezone").textContent = timezoneOffset(data.timezone);
