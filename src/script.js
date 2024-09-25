require('dotenv').config();

document.getElementById('fetchData').addEventListener('click', () => {
	const location = document.getElementById('locationInput').value;

	const apiKey = process.env.WEATHER_API_KEY;
	const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&key=${apiKey}&contentType=json`;

	fetch(apiUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			displayHourlyReport(data);
		})
		.catch((error) => {
			document.getElementById('output').textContent = 'Error: ' + error.message;
			console.error(error);
		});
});

function displayHourlyReport(data) {
  const output = document.getElementById('output');
  output.textContent = '';

  data.days.forEach(day => {
      const dayHeader = document.createElement('h3');
      dayHeader.textContent = `Date: ${day.datetime} (Max Temp: ${day.tempmax}°C, Min Temp: ${day.tempmin}°C)`;
      output.appendChild(dayHeader);

      const hourList = document.createElement('ul');
      day.hours.forEach(hour => {
          const hourItem = document.createElement('li');
          hourItem.textContent = `${hour.datetime}: Temp ${hour.temp}°C, Feels Like ${hour.feelslike}°C, Conditions: ${hour.conditions}, Precipitation: ${hour.precip}mm, Wind Speed: ${hour.windspeed} km/h`;
          hourList.appendChild(hourItem);
      });
      output.appendChild(hourList);
  });
}