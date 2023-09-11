import React, { useEffect, useState } from 'react'
import apikeys from '../Apikey'
import Animation from './Animation';
import './forcast.css'
function Forcast() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [state, setState] = useState("");

  const search = async () => {
    try {
      if (query) {

        const apicall = await fetch(`${apikeys.BASE_URl}?q=${query}&units=metric&APPID=${apikeys.key}`);
        const data = await apicall.json();
        setWeather(data)
        setQuery("")
        

        switch (data.weather[0].main) {
          case "Haze":
            setState("CLEAR_DAY")
            break;
          case "Clouds":
            setState("CLOUDY")
            break;
          case "Rain":
            setState("RAIN")
            break;
          case "Snow":
            setState("SNOW")
            break;
          case "Dust":
            setState("DUST")
            break;
          case "Fog":
            setState("FOG")
            break;
          case "Tornado":
            setState("WIND")
            break;

          default:
            setState("CLEAR_DAY")
       }

       }

    }
    catch (error) {
      console.log(error)
      setQuery("")
      setWeather("")


    }
  }

  useEffect(() => {
    search()
  }, [])



  return (
    <div className='forcast-box'>

      <div className="search-box">
        <input type="text"
          placeholder='search any city'
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <div className='img-box'>

          <img src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
            onClick={search}
          />
        </div>
      </div>
      <div className='all'>
        {typeof weather.main != "undefined" ? (
          <div className="all-content">

            <div className="animation">
              <Animation icon={state} />
              <h2>{weather.weather[0].description}</h2>
            </div>
            <hr />
            <div className="city-head">
              <p>{weather.name} {weather.sys.country}</p>

              <img
                className="temp"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              />
            </div>
            <hr />
            <div className="item">
              Temperature
              <span>

                {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
              </span>
            </div>
            <hr />
            <div className="item">
              Humidity
              <span>

                {Math.round(weather.main.humidity)}%
              </span>

            </div>
            <hr />
            <div className="item">
              Visibility
              <span>

                {Math.round(weather.visibility)} mi
              </span>

            </div>
            <hr />
            <div className="item">
              Wind Speed
              <span>
                {Math.round(weather.wind.speed)} Km/m

              </span>
            </div>

          </div>


        ) : (
          <div>

          </div>
        )
        }

      </div>

    </div>

  )
}

export default Forcast