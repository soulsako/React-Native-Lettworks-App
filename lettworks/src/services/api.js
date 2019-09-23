import axios from 'axios';
// import { isDev } from 'config/functions';
import Constants from "expo-constants";
import { expo } from '../../app.json';

const { manifest } = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? `http://${manifest.debuggerHost.split(`:`).shift().concat(`:8000`)}/api/v1`
  : `api.example.com`;

// function getApiUrl() {
//     return isDev() ? config.dev : config.prod;
// }

// const ROOT_URL = getApiUrl();

class API {

    google(data){
      let url;
      if(typeof(data) === typeof(String())){
        url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${data}&key=${expo.googleMaps.APIKey}`
      }else {
        url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=${expo.googleMaps.APIKey}`
      }
      return axios.get(url)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data
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

    login(data) {
        this.token = null;
        this.loggedIn = false;
        return axios({
            method: 'post',
            url: `${api}/users/login`,
            data: data
        }).then(response => {
            return response.data;
        }).catch(error => {
            if (error.response && error.response.status === 401) throw error.response;
            throw this.getError(error);
        });
    }
    http(details) { 

      //Data:
//   {
//   preferences: {
//     type: this.state.selectedType || undefined,
//     selectedBedroom: this.state.selectedBedroom || undefined,
//     propertyType: this.state.selectedPropertyType || undefined
// }
//}
// }

    //   {
  //     endpoint: `/updateme`,
  //     method: 'patch',
  //     data, 
  //     token: auth.token
  // }
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