const { VITE_API_URL_PROD, VITE_API_URL_DEV, NODE_ENV } = import.meta.env;

const apiUrl = NODE_ENV === 'production' 
    ? VITE_API_URL_PROD 
    : VITE_API_URL_DEV;

export const envConfig = {
    apiUrl,
};
