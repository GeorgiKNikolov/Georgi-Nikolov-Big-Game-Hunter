import * as request from "./requester";
const baseUrl = "http://localhost:3030/jsonstore/trophy";

export const  getAll = () => {
 return request.get(`${baseUrl}`);
};

export const create = (trophyData) =>{
return request.post(`${baseUrl}`,trophyData);
};

export const getOne = (trophyId) => {
return request.get(`${baseUrl}/${trophyId}`);
};

export const edit = (trophyId, trophData) => {
    return request.put(`${baseUrl}/${trophyId}`,trophData);
};

export const remove = (trophyId) =>{
    return request.del(`${baseUrl}/${trophyId}`);
};