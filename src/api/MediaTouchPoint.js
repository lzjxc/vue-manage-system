import axios from './axiosConfig';

export const getAllMediaTouchPoint = params => {
    return axios.get(`/api/MediaTouchPoint/getAllMediaTouchPoint`);
};
export const getMediaTouchPointByMerchant = params => {
    return axios.get(`/api/MediaTouchPoint/getMediaTouchPointByMerchant?merchant=`+params,);
};
export const downloadAllMediaTouchPointCsvByMerchant = params => {
    return axios.get(`/api/MediaTouchPoint/downloadAllMediaTouchPointCsvByMerchant?merchant=` + params);
};
export const downloadOneMediaTouchPointCsvById = params => {
    return axios.get(`/api/MediaTouchPoint/downloadOneMediaTouchPointCsvById?id=` + params);
};
export const deleteOneMediaTouchPointById = params => {
    return axios.get(`/api/MediaTouchPoint/deleteOneMediaTouchPointById?id=` + params);
};