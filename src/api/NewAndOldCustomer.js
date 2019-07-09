import axios from './axiosConfig';

export const getAllNewAndOldCustomer = params => {
    return axios.get(`/api/NewAndOldCustomer/getAllNewAndOldCustomer`);
};
export const getNewAndOldCustomerByMerchant = params => {
    return axios.get(`/api/NewAndOldCustomer/getNewAndOldCustomerByMerchant?merchant=` + params,);
};
export const downloadAllNewAndOldCustomerCsvByMerchant = params => {
    return axios.get(`/api/NewAndOldCustomer/downloadAllNewAndOldCustomerCsvByMerchant?merchant=` + params);
};
export const downloadOneNewAndOldCustomerCsvByTitle = params => {
    return axios.get(`/api/NewAndOldCustomer/downloadOneNewAndOldCustomerCsvByTitle?title=` + params);
};