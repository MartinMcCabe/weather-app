import React from 'react'

const WeatherDisplay = ({ weatherdata, icon, label }) =>{

  return (
    <div className='content weather-display'>
      <h1 className='weather-display__name'>{ weatherdata.name }</h1>
      <h2 className='weather-display__time'>Now</h2>
      <div className='weather-display__icon'>
        <div className={icon}></div>
        <div className='weather-display__icon-label'>{label}</div>
      </div>
      <div className='weather-display__temp'>
        <div className='weather-display__temp-main'>{Math.round(weatherdata.main.temp)}<sup>&deg;c</sup></div>
        <div className='weather-display__temp-min'>Low: {weatherdata.main.temp_min}<sup>&deg;c</sup></div>
        <div className='weather-display__temp-max'>High: {weatherdata.main.temp_max}<sup>&deg;c</sup></div>
      </div>
    </div>
  )
}

export default WeatherDisplay
