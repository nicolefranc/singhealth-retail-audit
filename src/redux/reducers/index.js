import { combineReducers } from 'redux';
import counterReducer from './counter';
import authReducer from './auth';
import reportReducer from './report';

const allReducers = combineReducers({
    counter: counterReducer,
    user: authReducer,
    report: reportReducer
})

export default allReducers;