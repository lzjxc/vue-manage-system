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
export const downloadOneMediaTouchPointCsvByTitle = params => {
    return axios.get(`/api/MediaTouchPoint/downloadOneMediaTouchPointCsvByTitle?title=` + params);
};
export const deleteOneMediaTouchById = params => {
    return axios.get(`/api/MediaTouchPoint/deleteOneMediaTouchById?id=` + params);
};