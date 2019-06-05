import axios from './axiosConfig';

export const getAllDataMergePeoplePerspective = params => {
    return axios.get(`/api/DataMergePeoplePerspective/getAllDataMergePeoplePerspective`);
};
export const getDataMergePeoplePerspectiveByMerchant = params => {
    return axios.get(`/api/DataMergePeoplePerspective/getDataMergePeoplePerspectiveByMerchant?merchant=` + params,);
};
export const downloadAllDataMergePeoplePerspectiveCsvByMerchant = params => {
    return axios.get(`/api/DataMergePeoplePerspective/downloadAllDataMergePeoplePerspectiveCsvByMerchant?merchant=` + params);
};
export const downloadOneDataMergePeoplePerspectiveCsvById = params => {
    return axios.get(`/api/DataMergePeoplePerspective/downloadOneDataMergePeoplePerspectiveCsvById?id=` + params);
};