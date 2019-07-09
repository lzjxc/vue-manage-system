import axios from './axiosConfig';

export const getAllHistoryPurchasePeopleConstitute = params => {
    return axios.get(`/api/HistoryPurchasePeopleConstitute/getAllHistoryPurchasePeopleConstitute`);
};
export const getHistoryPurchasePeopleConstituteByMerchant = params => {
    return axios.get(`/api/HistoryPurchasePeopleConstitute/getHistoryPurchasePeopleConstituteByMerchant?merchant=` + params,);
};
export const downloadAllHistoryPurchasePeopleConstituteExcelByMerchant = params => {
    return axios.get(`/api/HistoryPurchasePeopleConstitute/downloadAllHistoryPurchasePeopleConstituteExcelByMerchant?merchant=` + params,{responseType: 'blob'});
};
export const downloadOneHistoryPurchasePeopleConstituteExcelById = params => {
    return axios.get(`/api/HistoryPurchasePeopleConstitute/downloadOneHistoryPurchasePeopleConstituteExcelById?id=` + params,{responseType: 'blob'});
};