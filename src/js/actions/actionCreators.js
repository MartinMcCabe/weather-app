import {
  IS_FETCHING,
  REFRESH,
  RECEIVE_LOCATION,
  LOCATION_ERROR,
  IS_LOCATING,
  FETCH_ERROR,
  RECEIVE_WEATHER,
  CLEAR_ERRORS
} from './actionTypes';

import fetch from 'isomorphic-fetch'

// GENERAL
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}

export const refresh = () => {
  return {
    type: REFRESH
  }
}


// LOCATION
const receiveLocation = (location, permission_granted) => {
  return {
    type: RECEIVE_LOCATION,
    location,
    permission_granted
  }
}

const locationError = (error) => {
  return {
    type: LOCATION_ERROR,
    error
  }
}

const retrieveLocation = (retrieve) => {
  return {
    type: IS_LOCATING,
    retrieve
  }
}

export const getLocation = () => {
  return (dispatch, getState) => {
    dispatch(retrieveLocation(true))

    const geolocation = navigator.geolocation

    if (!geolocation) {
      dispatch(locationError(`Geolocation not supported by this browser`))
    }

    geolocation.getCurrentPosition((position) => {
      // user granted permission, awesome
      dispatch(receiveLocation(position, true))
    }, () => {
      // user denied permission, try get next best thing
      return fetch(`${location.protocol}//freegeoip.net/json/`)
        .then(res => {
          if (res.status >= 400){
            dispatch(locationError(`There was a problem retrieving your current location, please try again later`))
            var err = new Error(res.statusText)
            err.response = res
            throw err
          }
          return res.json()
        },error => {
          dispatch(fetchError(`There was an error while trying to get your location, please try again later.`))
          var err = new Error(error.message)
          throw err
        })
        .then( json => {
          const location={
            coords: {
              latitude: json.latitude,
              longitude: json.longitude
            }
          }
          dispatch(receiveLocation(location, false))
        } )
        .catch(e => {
          console.error(e)
        })
    });
  }
}

// WEATHER
export const isFetching = (is_fetching) => {
  return {
    type: IS_FETCHING,
    is_fetching
  }
}

export const fetchError = (error_message) => {
  return {
    type: FETCH_ERROR,
    error_message
  }
}

export const receiveWeather = (data) => {
  return {
    type: RECEIVE_WEATHER,
    data
  }
}

export const getCurrentWeather = () => {
  return (dispatch, getState) => {
    const {
      latitude,
      longitude
    } = getState().location.coords;
    const api_key = `b490540acdcc293abddd7596dc3cbb70`
    const api_call = `${location.protocol}//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api_key}`

    dispatch(isFetching(true))

    return fetch(api_call)
      .then(res => {
        if (res.status >= 400) {
          dispatch(fetchError(`There was a problem with the server, please try again later`))
          var err = new Error(res.statusText)
          err.response = res
          throw err
        }
        return res.json()
      }, error => {
        dispatch(fetchError(error.message))
        var err = new Error(error.message)
        throw err
      })
      .then(json => {
        dispatch(receiveWeather(json))
      })
      .catch(e => {
        console.error(e)
      })
  }
}
