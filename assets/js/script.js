const users = {
  "Holly": {"Location": "Wakefield, GB", "Temperature": "0"},
  "Jason": {"Location": "Washington, GB", "Temperature": "0"},
  "Joanne": {"Location": "Vancouver, CA", "Temperature": "0"},
  "Ed": {"Location": "Highbury, GB", "Temperature": "0"},
  "Rebecca": {"Location": "Swords, IE", "Temperature": "0"},
  "Gemma": {"Location": "Hilversum, NL", "Temperature": "0"},
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
        `https://api.openweathermap.org/data/2.5/weather?q=${userObj.Location}&units=imperial&appid=${apiKey}`
      );
      const data = await response.json();
      const temperature = data.main.temp.toFixed(1);
      const weather = data.weather[0].icon;
      const country = users[user].Location.split(", ")[1];

      users[user].Temperature = temperature;
      const celcius = ((temperature - 32) * 5 / 9).toFixed(1);

      temperatureData.push({ user, temperature, country, weather, celcius });
    } catch (error) {
      console.error(`Failed to update temperature for ${user}. Error: ${error}`);
    }
  }

  temperatureData.sort((a, b) => parseFloat(b.temperature) - parseFloat(a.temperature));

  temperatureData.forEach(({ user, temperature, country, weather, celcius }, index) => {
    document.getElementsByClassName('name')[index].innerHTML = `
      ${index < 3 ? medals[index] : ''}
      ${user} <img class="country-icon" src="https://www.countryflagicons.com/SHINY/32/${country}.png">
    `;

    document.getElementsByClassName('name')[index].nextElementSibling.innerHTML = `<img class="weather-icon" src="https://openweathermap.org/img/wn/${weather}.png"> ${temperature}°F / ${celcius}°C`;

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