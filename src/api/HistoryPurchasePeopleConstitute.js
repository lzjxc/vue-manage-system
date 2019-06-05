import axios from './axiosConfig';

export const getAllHistoryPurchasePeopleConstitute = params => {
    return axios.get(`/api/HistoryPurchasePeopleConstitute/getAllHistoryPurchasePeopleConstitute`);
};
export const getHistoryPurchasePeopleConstituteByMerchant = params => {
    return axios.get(`/api/HistoryPurchasePeopleConstitute/getHistoryPurchasePeopleConstituteByMerchant?merchant=` + params,);
};
export const downloadAllHistoryPurchasePeopleConstituteCsvByMerchant = params => {
    return axios.get(`/api/HistoryPurchasePeopleConstitute/downloadAllHistoryPurchasePeopleConstituteCsvByMerchant?merchant=` + params);
};
export const downloadOneHistoryPurchasePeopleConstituteCsvById = params => {
    return axios.get(`/api/HistoryPurchasePeopleConstitute/downloadOneHistoryPurchasePeopleConstituteCsvById?id=` + params);
};