import { envConfig } from "../config/env.config";

export const LOGIN_URL = `${envConfig.apiUrl}/auth/login`;
export const RECOVER_URL = `${envConfig.apiUrl}/auth/recover`;
export const REGISTER_URL = `${envConfig.apiUrl}/auth/register`;
export const LOGOUT_URL = `${envConfig.apiUrl}/auth/logout`;
export const USER_URL = `${envConfig.apiUrl}/user`;
