import axios from './axiosConfig';


export const saveScore = params => {
    return axios.get(`/api/KnowledgeTestScore/saveScore?testerName=`+ params.testerName + `&&testerScore=` +params.testerScore + `&&subCategory=` +params.subCategory);
};