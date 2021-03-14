import { LOGIN, LOGOUT } from "../redux-consts";

const authReducer = (state = null, action) => {
    switch(action.type) {
        case LOGIN:
            return action.payload;
        case LOGOUT:
            return null;
        default:
            return state;
    }
};

export default authReducer;