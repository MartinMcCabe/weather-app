import {
  createStore,
  applyMiddleware
} from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers/rootReducer'

const init_state = {

  location: {
    is_locating: false,
    located: false,
    coords: {
      latitude: 0,
      longitude: 0
    },
    error: null,
    permission_granted: false,
    should_refresh: false
  },

  weather: {
    is_fetching: false,
    data_received: false,
    data: null,
    error: null
  }

}

const store = createStore(rootReducer, init_state, applyMiddleware(thunkMiddleware));
export default store;
