import { useState } from 'react';

//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
export default function useToken() {
    
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
        window.location.reload(false);
    };



    return {
        setToken: saveToken,
        token
    }
}