import Cookies from "js-cookie";


export const getHeaders = () => {
    const token = Cookies.get('token')

    return {
        'Content-type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    }
};