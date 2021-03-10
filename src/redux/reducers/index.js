import { combineReducers } from 'redux';
import counterReducer from './counter';
import isLoggedReducer from './isLogged';
import reportReducer from './report';

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: isLoggedReducer,
    report: reportReducer
})

export default allReducers;