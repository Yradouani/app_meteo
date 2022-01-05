import React, { useState } from 'react';
const api = {
  key: 'b88368428089bf4d58a1bc91319c7781',
  base: 'https://api.openweathermap.org/data/2.5/'
}
function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&lang=fr&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
    let days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? 
      ((weather.weather[0].main === 'Clear') ? 
        'app warm' 
        : ((weather.weather[0].main === 'Snow') ? 
          'app snow' 
          : ((weather.weather[0].main === 'Clouds') ? 
            'app clouds' 
            : 'app rain'))) 
      : 'app'}>
      <main>
        <div className="search-box">
        <input type='text' className="search-bar" placeholder="Rechercher votre ville..." onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
    
  );
}

export default App;
