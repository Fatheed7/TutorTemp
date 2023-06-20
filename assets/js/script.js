const users = {
    "Holly": {"Location": "Wakefield, GB", "Temperature": "0"},
    "Jason": {"Location": "Washington, GB", "Temperature": "0"},
    "Joanne": {"Location": "Vancouver, CA", "Temperature": "0"},
    "Ed": {"Location": "Highbury, GB", "Temperature": "0"},
    "Josh": {"Location": "Rochester, GB", "Temperature": "0"},
    "Gemma": {"Location": "Dongo, IT", "Temperature": "0"},
  };
  
  async function updateTemperatures() {
    const apiKey = "4c99dcce7d87a6c7ec0ae4d4d923573f"; 
  
    for (const [user, userObj] of Object.entries(users)) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${userObj.Location}&units=imperial&appid=${apiKey}`
        );
        const data = await response.json();
        const temperature = data.main.temp.toFixed(1);
  
        users[user].Temperature = temperature;
        const celcius = ((temperature - 32) * 5/9).toFixed(1);

  
        document.getElementById(`${user}`).textContent = `${user} - ${temperature}°F / ${celcius}°C`;
      } catch (error) {
        console.error(`Failed to update temperature for ${user}. Error: ${error}`);
      }
    }
  }
  
  updateTemperatures();