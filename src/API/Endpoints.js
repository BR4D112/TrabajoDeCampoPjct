// Eliminamos: import { envConfig } from "../config/env.config";

// Base URL fija
const BASE_URL = "https://sage-backend-mxlb.onrender.com";

export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const RECOVER_URL = `${BASE_URL}/auth/recover`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const USER_URL = `${BASE_URL}/user`;
export const PASSWORD_RESET = `${BASE_URL}/user`;

export const CREATE_DOCENTE = `${BASE_URL}/teachers/create`;
export const SEARCH_DOCENTE = `${BASE_URL}/teachers/search`;
export const UPDATE_DOCENTE = `${BASE_URL}/teachers/`;

export const SEARCH_ACADEMIC_PERIOD = `${BASE_URL}/academic_periods`;
export const CREATE_ACADEMIC_PERIOD = `${BASE_URL}/academic-periods/register`;
export const UPDATE_ACADEMIC_PERIOD = `${BASE_URL}/academic-periods/`;

export const CREATE_SUBJECT = `${BASE_URL}/subjects/create`;
export const SEARCH_SUBJECT = `${BASE_URL}/subjects/search`;
export const UPDATE_SUBJECT = `${BASE_URL}/subjects/`;

export const CREATE_GROUP = `${BASE_URL}/groups/create`;
export const SEARCH_GROUP = `${BASE_URL}/groups/search`;
export const UPDATE_GROUP = `${BASE_URL}/groups/`;
export const ASSIGN_TEACHER_URL = `${BASE_URL}/groups/`;

export const CREATE_SESSION = `${BASE_URL}/sessions/create`;
export const SEARCH_SESSION = `${BASE_URL}/sessions`;
export const UPDATE_SESSION = `${BASE_URL}/sessions`;

export const CREATE_CLASSROOM = `${BASE_URL}/classrooms/create`;
export const SEARCH_CLASSROOM = `${BASE_URL}/classrooms/search`;
export const UPDATE_CLASSROOM = `${BASE_URL}/classrooms/`;

export const CREATE_REPORT = `${BASE_URL}/reports/send-schedule`;
export const CREATE_REPORTS_ALL = `${BASE_URL}/reports/send-schedules`;

