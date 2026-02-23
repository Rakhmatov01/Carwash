import api from './axios';

// Carwash
export const getCarwashesApi =()=>api.get("/carwash/");
export const getCarwashApi = (id)=>api.get(`/carwash/${id}`);
export const createCarwashApi = (formData)=>api.post("/carwash/create/",formData, {
    headers : {"Content-Type" : "multipart/form-data"},
});

export const updateCarwashApi = (id , formDataOrJson)=>api.patch(`/carwash/${id}/update/` , formDataOrJson , {headers:
    formDataOrJson instanceof FormData ? {"Content-Type":"multipart/form-data"} : undefined,
});

export const deleteCarwashApi = (id) => api.delete(`/carwash/${id}/delete/`);

// Services 
export const getServicesApi = (carwashId) => api.get(`/carwash/${carwashId}/services/`);
export const addServiceApi = (carwashId, data) => api.post(`/carwash/${carwashId}/services/`, data);

// Comments 
export const getCommentApi = (carwashId) =>api.get(`/carwash/${carwashId}/comments/`);
export const addCommentApi = (carwashId, text) => api.post(`/carwash/${carwashId}/comments/`, {text});

// Rating
export const rateCarwashApi = (carwashId , score)=>api.post(`/carwash/${carwashId}/rate/`, {score});

// Quote 
export const quoteApi = (carwashId, serviceIds)=>api.post(`/carwash/${carwashId}/quote/` , {service_ids: serviceIds});