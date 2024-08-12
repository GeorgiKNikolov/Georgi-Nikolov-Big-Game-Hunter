import * as request from "./requester";
const baseUrl = "http://localhost:3030/jsonstore/routes";

export const  getAll = () => {
    return request.get(`${baseUrl}`);
};
   
export const getOne = (routeId) =>{
    return request.get(`${baseUrl}/${routeId}`);
};
   

export const create = (routeData) =>{
    return request.post(`${baseUrl}`,routeData);
};

export const edit = (routeId, routeData) => {
    return request.put(`${baseUrl}/${routeId}`,routeData);
};

export const remove = (routeId) =>{
    return request.del(`${baseUrl}/${routeId}`);
};