import { combineReducers } from 'redux';
import counterReducer from './counter';
import authReducer from './auth';
import reportReducer from './report';
import imageReducer from './image';

const allReducers = combineReducers({
    counter: counterReducer,
    user: authReducer,
    report: reportReducer,
    images: imageReducer,
})

export default allReducers;