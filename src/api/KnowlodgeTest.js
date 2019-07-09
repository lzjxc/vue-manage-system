import axios from './axiosConfig';

export const getAllKnowledgeTest = params => {
    return axios.get(`/api/KnowledgeTest/getAllKnowledgeTest`);
};
export const getKnowledgeTestByMerchant = params => {
    return axios.get(`/api/KnowledgeTest/getKnowledgeTestByMerchant?merchant=` + params,);
};
export const downloadAllKnowledgeTestExcelByMerchant = params => {
    return axios.get(`/api/KnowledgeTest/downloadAllKnowledgeTestExcelByMerchant?merchant=` + params,{responseType: 'blob'});
};
export const downloadOneKnowledgeTestExcelById = params => {
    return axios.get(`/api/KnowledgeTest/downloadOneKnowledgeTestExcelById?id=` + params,{responseType: 'blob'});
};