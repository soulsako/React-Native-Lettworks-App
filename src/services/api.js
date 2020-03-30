import axios from 'axios';
// import { isDev } from 'config/functions';
import Constants from "expo-constants";
import { expo } from '../../app.json';

const facebookGraphApiUrl = (token) => `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`;


const { manifest } = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? `http://${manifest.debuggerHost.split(`:`).shift().concat(`:8000`)}/api/v1`
  : `api.example.com`;

// function getApiUrl() {


//     return isDev() ? config.dev : config.prod;
// }

// const ROOT_URL = getApiUrl();

class API {

  facebookGraphApi(token){
    const url = facebookGraphApiUrl(token);
    return axios.get(url)
    .then(response => {
      // console.log("FACEBOOK RESPONSE: ", response.data);
      return response.data;
    })
    .catch(({message}) => {
      // console.log("ERROR MESSAGE FROM FACEBOOK", message);
      return {
        message, 
        error: true
      }
    });
  }

  google(data) {
    let url;
    if (typeof data === typeof String()) {
      url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${data}&key=${expo.android.config.googleMaps.apiKey}`;
    } else {
      url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=${expo.android.config.googleMaps.apiKey}`;
    }
    return axios
      .get(url)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data
      })
    }

    rapidApi(lat, lng){
      const url = `https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=${lat}&longitude=${lng}&range=0`;
      return axios({
        url,
        method: 'GET', 
        headers: {
          "x-rapidapi-host": "geocodeapi.p.rapidapi.com",
		      "x-rapidapi-key": "afaf62ae2bmsh16ac9cf2d2e3e4fp187a2fjsn3bd3e08130d1"
        }
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      })
    }

    clear() {
        this.token = null;
        this.loggedIn = false;
    }
    logout() {
        this.http({
            url: `/logout`,
            method: 'post'
        }).catch(ex => { });
        this.clear();
    }
    setToken(token) {
        this.token = token;
        this.loggedIn = true;
    }
    validateToken(token) {
        if (!token) return Promise.reject('Invalid Token');
        return axios({
            method: 'get',
            url: `${ROOT_URL}/tokens/${token}`,
            headers: {
                'X-Token': token
            }
        }).then(response => {
            this.token = token;
            return response.data;
        }).catch(error => {
            if (error.response && error.response.status === 401) this.logout();
            throw error;
        });
    }

    createAccount(data) { // {name: '', email: '', password: ''}
        return axios({
            url: `${api}/users/signup`,
            method: 'post',
            data
        }).then(response => {
            const { user, token } = response.data;
            this.setToken(token);
            return {
                user, 
                token
            }
        }).catch(error => {
            throw this.getError(error);
        });
    }

  socialLogin(data){
    this.token = null;
    this.logeedIn = false;
    return axios({
      method: 'post', 
      url: `${api}/users/sociallogin`, 
      data
    })
    .then(response => {
      console.log("Social Login response from backend", response.data);
      return response.data;
    })
    .catch(error => {
      console.log("Social login error response from backend", error.response.data);
      return error.response.data;
    });
  }

  login(data) {
    this.token = null;
    this.loggedIn = false;
    return axios({
      method: "post",
      url: `${api}/users/login`,
      data: data
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error.response && error.response.status === 401)
          throw error.response;
        throw this.getError(error);
      });
  }
    http(details) { 

      const config = {
        method: details.method,
        url: `${api}/${details.type}/${details.endpoint}`,
        data: details.data, 
      }
      // console.log("config", config);
      if (details.token) {
        if (!config.headers) config.headers = {};
        config.headers['authorization'] = `Bearer ${details.token}`;
      }
      // if (config.data && typeof config.data === 'object') {
      //     // Remove any underscores
      //     config.data = Object.keys(config.data)
      //         .filter(key => key.substr(0, 1) != '_')
      //         .reduce((acc, current) => {
      //             acc[current] = config.data[current];
      //             return acc;
      //         }, {});
      // }
      return axios(config)
      .then(response => {
          return response.data;
      })
      .catch(error => {
          if (error.response) throw error.response.data;
          throw this.getError(error);
      });
        
    }

    getError(error) {
        if (!error.response) return error;
        try {
            if (typeof error.response.data !== 'object') return error.response;
            if (typeof error.response.data.error === 'string') return JSON.parse(error.response.data.error);
            if (typeof error.response.data.error === 'object') return error.response.data.error;
            return error.response.data;
        } catch (ex) {
            return typeof error.response.data === 'object' ? JSON.parse(error.response.data) : error.response;
        }
    }
}

export default new API();