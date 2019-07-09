import axios from './axiosConfig';

export const getAllDataMerge = params => {
    return axios.get(`/api/DataMerge/getAllDataMerge`);
};
export const getDataMergeByMerchant = params => {
    return axios.get(`/api/DataMerge/getDataMergeByMerchant?merchant=` + params,);
};
export const downloadAllDataMergeCsvByMerchant = params => {
    return axios.get(`/api/DataMerge/downloadAllDataMergeCsvByMerchant?merchant=` + params);
};
export const downloadOneDataMergeCsvByTitle = params => {
    return axios.get(`/api/DataMerge/downloadOneDataMergeCsvByTitle?title=` + params);
};