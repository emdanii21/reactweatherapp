import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState, useEffect } from "react";
import axios from "axios";

let num1 = 0;



function Hi() {


  const [data, setData] = useState(0);
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});



  const submitHandler = (e) => {
    e.preventDefault();

    console.log("city: " + cityName);

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
      .then(function (response) {

        console.log("data: ", response.data);

        setWeather(response.data)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    const getWeather = () => { // get current weather 
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
        .then(function (response) {

          console.log("data: ", response.data);
          setWeather(response.data)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    getWeather();
  }, [])



  return <div>


    <h1>
      weather app:
    </h1>

    <form onSubmit={submitHandler}>

      <input
        type="text"
        placeholder='Enter your City/Province name'
        onChange={(e) => {
          setCityName(e.target.value)
        }}
      />
  <br/>

      <button type="submit">Enter Here
      </button>

    </form>

    <br />

    {(weather?.name)?

      <div className='wpp'>
        <div>Weather of {weather?.name} <br /> </div>
        <div>Current Temp {weather?.main?.temp}°C <br /></div>
        <div>Feels Like :{weather?.main?.feels_like}°C <br /><br /></div>

      </div>
      :
      null
    }

  </div>;
}

ReactDOM.render(<Hi />, document.querySelector('#root'));