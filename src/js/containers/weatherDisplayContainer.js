import React, { Component } from 'react'
import { connect } from 'react-redux'

// presentational components
import WeatherDisplay from '../components/weatherDisplay'

const icons = require('../icons')

class WeatherDisplayContainer extends Component {

  constructor( props ) {
    super( props )
  }

  getIconClass() {
    const { weather } = this.props

    let pre = 'wi wi-'
    const id = weather.data.weather[0].id
    let icon = icons[id].icon

    if (!(id > 699 && id < 800) && !(id > 899 && id < 1000)) {
      const nowdate = new Date()
      const sunrise = new Date(weather.data.sys.sunrise * 1000)
      const sunset = new Date(weather.data.sys.sunset * 1000)
      const isDaytime = sunrise < nowdate && sunset > nowdate
      icon = isDaytime ? 'day-' + icon : 'night-' + icon
    }

    icon = pre + icon
    return { icon, label: icons[id].label }
  }

  render() {
    const { weather } = this.props
    const { icon, label } = this.getIconClass() 
    return (
      <WeatherDisplay  weatherdata={weather.data} icon={icon} label={label} />
    )
  }
}

function mapStateToProps(state){
  const { weather } = state;
  return {
    weather
  }
}

export default connect(mapStateToProps)(WeatherDisplayContainer)
