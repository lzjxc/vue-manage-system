import axios from './axiosConfig';

export const getAllKnowledgeTest = params => {
    return axios.get(`/api/KnowledgeTest/getAllKnowledgeTest`);
};
export const getKnowledgeTestListBySubCategory = params => {
    return axios.get(`/api/KnowledgeTest/getKnowledgeTestListBySubCategory?subCategory=` + params,);
};