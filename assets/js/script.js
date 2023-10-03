const users = {
  "Holly": {"Location": "Wakefield, GB", "Temperature": "0", "timezone": "Europe/London"},
  "Jason": {"Location": "Washington, GB", "Temperature": "0", "timezone": "Europe/London"},
  "Joanne": {"Location": "Vancouver, CA", "Temperature": "0", "timezone": "America/Vancouver"},
  "Santa Claus": {"Location": "North Pole, US", "Temperature": "0", "timezone": "Europe/London"},
  "Rebecca": {"Location": "Swords, IE", "Temperature": "0", "timezone": "Europe/London"},
  "Gemma": {"Location": "Hilversum, NL", "Temperature": "0", "timezone": "Europe/Amsterdam"},
};

async function updateTemperatures() {
  const apiKey = "4c99dcce7d87a6c7ec0ae4d4d923573f";
  const temperatureData = [];
  const medals = {
    0: '<img class="medal" src="assets/img/1st.png" alt="1st Place Medal">',
    1: '<img class="medal" src="assets/img/2nd.png" alt="2nd Place Medal">',
    2: '<img class="medal" src="assets/img/3rd.png" alt="3rd Place Medal">'
  }

  for (const [user, userObj] of Object.entries(users)) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${userObj.Location}&units=metric&appid=${apiKey}`
      );
      const { main, weather, id, dt, timezone } = await response.json();
      const temperature = main.temp.toFixed(1);
      const country = userObj.Location.split(", ")[1];
  
      users[user].Temperature = temperature;
  
      const secondResponse = await fetch('https://worldtimeapi.org/api/timezone/' + userObj.timezone);
      const secondData = await secondResponse.json();
  
      const { datetime } = secondData;
      const timeComponents = datetime.split('T')[1].split(':');
      const formattedTime = `${timeComponents[0]}:${timeComponents[1]}`;
  
      temperatureData.push({
        user,
        temperature,
        country,
        weather: weather[0].icon,
        description: weather[0].description,
        location_id: id,
        formattedTime
      });
    } catch (error) {
      console.error(`Failed to update temperature for ${user}. Error: ${error}`);
    }
  }

  temperatureData.sort((a, b) => parseFloat(b.temperature) - parseFloat(a.temperature));

  temperatureData.forEach(({ user, temperature, country, weather, description, location_id, formattedTime}, index) => {
    const medal = index < 3 ? medals[index] : '';
    const countryIcon = `<img class="country-icon" alt="${country} Flag" title="${country} Flag" src="https://www.countryflagicons.com/SHINY/32/${country}.png">`;
    const weatherIcon = `<img class="weather-icon" alt="${description}" title="${description} "src="https://openweathermap.org/img/wn/${weather}.png">`;
    
    document.getElementsByClassName('name')[index].innerHTML = `${medal} ${user} ${countryIcon} - ${formattedTime} `;
    document.getElementsByClassName('name')[index].nextElementSibling.innerHTML = `${weatherIcon} ${temperature}°C`;
    document.getElementsByClassName('forecast')[index].innerHTML = `<small><a href="https://openweathermap.org/city/${location_id}" target="_blank">View Forecast</a></small>`;
  });
}

console.log(`
 ____  _  _  ____  __  ____ 
(_  _)/ )( \\(_  _)/  \\(  _ \\
  )(  ) \\/ (  )( (  O ))   /
 (__) \\____/ (__) \\__/(__\\_)
   ____  ____  _  _  ____   
  (_  _)(  __)( \\/ )(  _ \\  
    )(   ) _) / \\/ \\ ) __/  
   (__) (____)\\_)(_/(__)    `)

updateTemperatures();
