document.getElementById('fetchData').addEventListener('click', () => {
	// Get the user input
	const location = document.getElementById('locationInput').value;

	// Construct the API URL using the user input
	const apiKey = 'R8DK5GX8T6J9Y7W2ZR5PPYCGR'; // Replace with your actual API key
	const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=uk&key=${apiKey}&contentType=json`;

	// Fetch data from the API
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
  output.textContent = '';  // Clear previous content

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