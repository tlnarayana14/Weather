const apiKey = "5deb14c078acb277bb20988cf89b70c5";
const button = document.getElementById("getWeather");
const cityInput = document.getElementById("city");
const buildURL = city =>
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
const fetchWeatherAsync = async city => {
    try {
        const response = await fetch(buildURL(city));
        if (!response.ok) {
            throw new Error("City not found or API error");
        }
        return await response.json();
    }
    catch (error) {
        alert(error.message);
    }
};
let chart;
const displayGraph = data => {
    if (!data || !data.list) {
        alert("Invalid data received");
        return;
    }
    const temps = data.list.slice(0, 8).map(item => item.main.temp);
    const times = data.list.slice(0, 8).map(item => item.dt_txt);
    const ctx = document
        .getElementById("weatherChart")
        .getContext("2d");
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: times,
            datasets: [{
                label: "Temperature (°C)",
                data: temps,
                borderWidth: 3,
                borderColor: "#00ffff",
                backgroundColor: "rgba(0,255,255,0.2)",
                tension: 0.4,
                pointBackgroundColor: "#ff00ff",
                pointBorderColor: "#ffffff"
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "white"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.15)"
                    }
                },
                y: {
                    ticks: {
                        color: "white"
                    },
                    grid: {
                        color: "rgba(255,255,255,0.15)"
                    }
                }
            }
        }
    });
};
button.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Enter city name");
        return;
    }
    const data = await fetchWeatherAsync(city);
    displayGraph(data);
});
const createSnow = () => {
    const snow = document.createElement("div");
    snow.classList.add("snowflake");
    snow.innerHTML = "❄";
    snow.style.left = Math.random() * window.innerWidth + "px";
    snow.style.animationDuration = (Math.random() * 3 + 2) + "s";
    snow.style.fontSize = (Math.random() * 10 + 10) + "px";
    document.body.appendChild(snow);
    setTimeout(() => snow.remove(), 5000);
};
setInterval(createSnow, 150);