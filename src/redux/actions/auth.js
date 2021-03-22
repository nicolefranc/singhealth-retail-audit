import { LOGIN, LOGOUT } from "../redux-consts"

export const login = (user) => (dispatch) => {
    console.log('Logging in...');
    localStorage.setItem('jwt', user.token);
    dispatch({
        type: LOGIN,
        payload: user.id
    })
};

export const logout = () => dispatch => {
    localStorage.removeItem('jwt');
    dispatch({
        type: LOGOUT
    })
}