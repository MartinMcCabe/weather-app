import {
  RECEIVE_LOCATION,
  IS_LOCATING,
  LOCATION_ERROR,
  CLEAR_ERRORS,
  REFRESH
} from '../actions/actionTypes';

const location = (state = {}, action) => {

  switch (action.type) {

    case RECEIVE_LOCATION:
      return Object.assign({}, state, {
        coords: action.location.coords,
        is_locating: false,
        located: true,
        permission_granted: action.permission_granted
      })

    case IS_LOCATING:
      return Object.assign({}, state, {
        is_locating: action.retrieve,
        located: false,
        should_refresh: false
      })

    case LOCATION_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        is_locating: false,
        located: false
      })

    case CLEAR_ERRORS:
      return Object.assign( {}, state, {
        error: null
      })

    case REFRESH:
      return Object.assign( {}, state, {
        is_locating: false,
        located: false,
        error: null,
        coords: {
          latitude: 0,
          longitude: 0
        },
        should_refresh: true
      })


    default:
      return state;
  }
}

export default location
