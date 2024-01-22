import axios from 'axios'
import Cookies from 'js-cookie' 

const accessToken = Cookies.get('accessToken')
export default axios.create({
    baseURL:process.env.REACT_APP_SERVER_URL,
    headers:{
        Authorization:`Bearer ${accessToken}`
    }
}) 