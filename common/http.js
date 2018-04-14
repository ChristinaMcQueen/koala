import axios from 'axios';
import qs from 'qs';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import axiosRetry from 'axios-retry';

const qsOption = {
    arrayFormat: 'indices',
    encodeValuesOnly: true,
    allowDots: true
};

window.axios = axios;
axios.defaults.timeout = 30000;
axios.defaults.paramsSerializer = params => qs.stringify(params, qsOption);
// axios.defaults.baseURL = `${location.protocol}//${location.host}/`;

axiosRetry(axios, {
    retries: 3,
    retryCondition(error) {
        if ((error.config || {}).neverRetry) {
            return false;
        }
        return !error.response;
    }
});

function globalErrorHandler(config, data) {
    if (!config.silence) {
        if (config.globalError) {
            config.globalError(data);
        }
        else if (data.errorMsg) {
            console.error(data.errorMsg);
        }
    }
}

axios.interceptors.request.use((config = {}) => {
    const after = { ...config, withCredentials: true };
    // after.url = config.url.replace('http://localhost:8080', 'http://192.168.10.25:3000')
    //     .replace(/^\//, 'http://192.168.10.25:3000/')
    //     .replace(/http:\/\/(\d+\.){3}\d+:\d+/, 'http://192.168.10.25:3000')
    //     .replace(/:\d+\//, ':3000/');
    // after.url = config.url.replace(/:\d+\//, ':8988/');
    after.headers = after.headers || {};
    if (/urlencoded/.test(after.headers['Content-Type'] || '')) {
        after.data = qs.stringify(after.data, qsOption);
    }
    return after;
}, error => Promise.reject(error));

axios.interceptors.response.use((res) => {
    const { config, data } = res;
    const result = data.data || {};
    if ({}.hasOwnProperty.call(data, 'code')) {
        if (data.code) {
            if (data.code) {
                globalErrorHandler(config, data);
            }
            return Promise.reject(data);
        }
    }
    else if ({}.hasOwnProperty.call(data, 'isSuccess')) {
        if (!data.isSuccess) {
            globalErrorHandler(config, data);
            return Promise.reject(data);
        }
    }
    if (isObject(result) || isArray(result)) {
        result.$response = res;
    }
    return result;
}, (error) => {
    const config = error.config || {};
    if (config.retryCount || error.code === 'ECONNABORTED') {
        console.error('网络连接异常，请稍候再试。', 5);
    }
    return Promise.reject(error);
});

export default axios;
