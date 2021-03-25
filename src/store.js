import { createStore } from 'redux';
import allReducers from './redux/reducers';
import { loadState, saveState } from './utils/localStorage';

// const persistedState = loadState();
// const persistedState = {
//     user: 123
// }
// console.log(persistedState);

const store = createStore(
    allReducers,
    // persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
);

// store.subscribe(() => {
//     saveState(store.getState());
//     console.log(store);
//     console.log('Saving state');
// })

export default store;