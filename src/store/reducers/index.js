import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import itemReducer from './reducer';

export default combineReducers({
    node: itemReducer,
    routing: routerReducer
})
