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
  
    for (const [user, userObj] of Object.entries(users)) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${userObj.Location}&units=imperial&appid=${apiKey}`
        );
        const data = await response.json();
        console.log(data);
        const temperature = data.main.temp.toFixed(1);
        const weather = data.weather[0].icon;
  
        users[user].Temperature = temperature;
        const celcius = ((temperature - 32) * 5/9).toFixed(1);

  
        document.getElementById(`${user}`).textContent = `${user}`;
        document.getElementById(`${user}`).nextElementSibling.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather}.png"> ${temperature}°F / ${celcius}°C`;
      } catch (error) {
        console.error(`Failed to update temperature for ${user}. Error: ${error}`);
      }
    }
  }
  
  updateTemperatures();