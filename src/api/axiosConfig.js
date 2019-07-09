import axios from 'axios';
import * as config from '../common/js/config'
import Vue from "vue";

Vue.prototype.$axios = axios;
axios.defaults.withCredentials = false;
let http = axios.create({
    // baseURL: config.default.codeImageUrl,
    baseURL: config.default.ApiUrl,
    // timeout: 1000,
    headers: {

        'Content-Type': 'application/json;charset=UTF-8',
    },
});



export default http;