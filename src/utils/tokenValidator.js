import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';

export const tokenValidator = (token) => {
    try{
        var decoded = jwtDecode(token);
        const timeNow = new Date().getTime() / 1000;
        return({expired: decoded.exp < timeNow, type: decoded.type, id: decoded.id, name: decoded.name, institutions: decoded.institutions ? decoded.institutions : decoded.institution});
    } catch (err){
        // throw new Error(err);
        return({expired: true, type: null});
    }
}