import { useEffect, useState } from "react";

import React from 'react'

import dateBuilder from '../dateBuilder'
import apikeys from "../Apikey";
import Currenttime from "./Currenttime";

import './Current.css'

function CurrentLocation() {
  //  state 
  const [state, setState] = useState({
    lat: undefined,
    lon: undefined,
    temperatureC: undefined,
    city: undefined,
    country: undefined,
  });
  const [loading, setloading] = useState(false)
  // get the lan and log of user
  const getPostion = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej)
    })
  }

  //  fetch the weather info
  const getWeather = async (lat, lon) => {
    try {
      const api_call = await fetch(`${apikeys.BASE_URl}?lat=${lat}&lon=${lon}&units=metric&APPID=${apikeys.key}`)
      const data = await api_call.json();
      // console.log(data)
      setState({
        lat: lat,
        lon: lon,
        city: data.name,
        temperatureC: Math.round(data.main.temp),
        country: data.sys.country
      });
    }
    catch (err) {
      console.log(err)


    }
  }

  //  to handle side effect 
  useEffect(() => {
    if (navigator.geolocation) {
      getPostion()
      setloading(true)
        .then((position) => {
          getWeather(position.coords.latitude, position.coords.longitude);

        })

        .catch((err) => {
          console.log(err)
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );

        })
    } else {
      alert('geo loaction is not found')
    }



  }, []);







  return (
    <div className="show">

      <div className="title">
        <h1>{state.city}</h1>
        <h3>{state.country}</h3>
      </div>

      <div className="current-date-time">
        <Currenttime />
        {dateBuilder(new Date())}
      </div>
      {
        loading ?

          <div className="temperature">

            {state.temperatureC}°<span>C</span>
          </div>
          :
          <div>

          </div>
      }




    </div>

  )


}








export default CurrentLocation;