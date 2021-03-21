import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';

export const tokenValidator = (token) => {
    try{
        var decoded = jwtDecode(token);
        console.log(decoded.type);
        const timeNow = new Date().getTime() / 1000;
        return({expired: decoded.exp < timeNow, type: decoded.type});
    } catch (err){
        // throw new Error(err);
        return({expired: true, type: null});
    }
}