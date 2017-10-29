import React, { Component } from 'react'
import { connect } from 'react-redux'

// action creators
import {
  getLocation,
  getCurrentWeather,
  clearErrors,
  refresh
 } from '../actions/actionCreators'

// presentational components
import ErrorMessage from '../components/errorMessage'
import BusyIndicator from '../components/busyIndicator'
import RefreshButton from '../components/refreshButton'
import Alert from '../components/alert'
import WeatherDisplayContainer from './weatherDisplayContainer'

class WeatherApp extends Component {

  constructor( props ) {
    super( props )
    const { dispatch } = this.props
    this.dispatch = dispatch
  }

  componentDidMount() {
    this.dispatch( getLocation() )
  }

  componentDidUpdate( prevProps, prevState ) {
    const { location, weather } = this.props
    if( location.located && !weather.data_received && !weather.is_fetching && !weather.error ) {
      this.dispatch( getCurrentWeather() )
    }

    if( location.should_refresh ){
      this.dispatch( getLocation() )
    }
  }

  renderBusyIndicator(){
    const { location, weather } = this.props
    if( location.is_locating || weather.is_fetching ) {
      return (
        <BusyIndicator />
      )
    }
    return null
  }

  renderAlert() {
    const { location } = this.props
    if( !location.permission_granted && location.located ){
      return (
        <Alert message="We're using a best guess of your location since permission was denied to use your current location" />
      )
    }else{
      return null
    }
  }

  doRefresh() {
    this.dispatch( refresh() )
  }

  renderWeatherDisplay() {
    const { weather } = this.props
    if( weather.data_received && weather.data ) {
      return (
        <div className='clearfix'>
          <WeatherDisplayContainer />
          <RefreshButton onClickRefresh={this.doRefresh.bind(this)} label='Refresh'/>
          {window.innerWidth}
        </div>
      )
    }else{
      return null
    }
  }

  clearErrors() {
    this.dispatch(clearErrors())
  }


  render() {
    const { location, weather } = this.props

    if( location.error || weather.error){
      const em = location.error ? location.error : weather.error
      return (
        <div className='wrapper'>
          <ErrorMessage errorMessage={ em } />
          <RefreshButton onClickRefresh={this.doRefresh.bind(this)} label='Try again' />
        </div>
      )
    }

    return (
      <div className='wrapper'>
        {this.renderAlert()}
        {this.renderWeatherDisplay()}
        {this.renderBusyIndicator()}
      </div>

    )
  }
}

function mapStateToProps(state){
  const { location, weather } = state;
  return {
    location,
    weather
  }
}

export default connect(mapStateToProps)(WeatherApp)
