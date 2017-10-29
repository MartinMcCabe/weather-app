import {
  IS_FETCHING,
  RECEIVE_WEATHER,
  FETCH_ERROR,
  CLEAR_ERRORS,
  REFRESH
} from '../actions/actionTypes';

const weather = (state = {}, action) => {

  switch (action.type) {
    case IS_FETCHING:
      return Object.assign( {}, state, {
        is_fetching: true,
        data_received: false
      })

    case RECEIVE_WEATHER:
      return Object.assign( {}, state, {
        is_fetching: false,
        data_received: true,
        data: action.data
      })

    case FETCH_ERROR:
      return Object.assign( {}, state, {
        is_fetching: false,
        data_received: false,
        error: action.error_message
      })

    case CLEAR_ERRORS:
      return Object.assign( {}, state, {
        error: null
      })
    
    case REFRESH:
      return Object.assign( {}, state, {
        is_fetching: false,
        data_received: false,
        data: null,
        error: null
      })

    default:
      return state;
  }
}

export default weather;
