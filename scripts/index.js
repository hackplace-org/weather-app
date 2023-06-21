const API_KEY = "06a45b74000c821256edc5c0b99d90f0";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const city = document.getElementById("city");
const units = document.getElementById("units");

const submitButton = document.getElementById("submit");
const currentButton = document.getElementById("current");

function handleError(error) {
	console.error(error);
	alert("An error occurred. Please try again later.");
}

submitButton.addEventListener("click", (event) => {
	event.preventDefault();

	// if (units.value !== "metric" && units.value !== "imperial") {
	// 	return alert("Please select a valid unit (metric or imperial");
	// }

	sessionStorage.setItem("useGeolocation", false);

	const url = new URL(BASE_URL);
	url.searchParams.append("appid", API_KEY);
	url.searchParams.append("q", city.value);
	url.searchParams.append("units", units.value);

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			if (data.cod !== 200) {
				city.value = "";
				return alert(data.message);
			}

			sessionStorage.setItem("weatherData", JSON.stringify(data));
			sessionStorage.setItem("city", city.value);
			sessionStorage.setItem("units", units.value);

			window.location.href = "weather.html";
		})
		.catch(handleError);
});

currentButton.addEventListener("click", (event) => {
	event.preventDefault();

	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition((position) => {
			const coords = position.coords;

			const url = new URL(BASE_URL);
			url.searchParams.append("appid", API_KEY);
			url.searchParams.append("lat", coords.latitude);
			url.searchParams.append("lon", coords.longitude);
			url.searchParams.append("units", units.value);

			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					if (data.cod !== 200) {
						city.value = "";
						return alert(data.message);
					}

					sessionStorage.setItem("weatherData", JSON.stringify(data));
					sessionStorage.setItem("city", data.name);
					sessionStorage.setItem("units", units.value);

					window.location.href = "weather.html";
				})
				.catch(handleError);
		});
	} else {
		alert("Geolocation is not supported by your browser");
	}
});
