import axios from 'axios';
import config from './../config.js';

export default {
  getAllPeople() {
    return axios({
      method: 'get',
      url: `${config.Swapi_URL}/people`
    });
  },
  getAllFilms() {
    return axios({
      method: 'get',
      url: `${config.Swapi_URL}/films`
    });
  },
  getAllSpecies() {
    return axios({
      method: 'get',
      url: `${config.Swapi_URL}/species`
    });
  },
  getAllVehicles() {
    return axios({
      method: 'get',
      url: `${config.Swapi_URL}/vehicles`
    });
  },
  getAllStarships() {
    return axios({
      method: 'get',
      url: `${config.Swapi_URL}/starships`
    });
  },
  calculateAverageDeath(data) {
    return axios({
      method: 'post',
      url: `${config.Villagers_URL}/api/Villager/calculate-average`,
      data: data
    });
  }
}
