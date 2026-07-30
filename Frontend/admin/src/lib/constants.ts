// API Base URL
export const API_HOST =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

// API Version (optional)
export const API_VERSION = "v1";

// Complete API URL
export const API_BASE_URL = `${API_HOST}/api/${API_VERSION}`;

// Authentication
export const API_TOKEN_COOKIE_KEY = "authorization";
export const REFRESH_TOKEN_COOKIE_KEY = "refreshToken";

// Request Configuration
export const API_TIMEOUT = 10000; // 10 seconds

// Content Types
export const CONTENT_TYPE = {
  JSON: "application/json",
  FORM_DATA: "multipart/form-data",
} as const;

// HTTP Methods
export const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

// Common Headers
export const HEADERS = {
  CONTENT_TYPE: "Content-Type",
  AUTHORIZATION: "Authorization",
  ACCEPT: "Accept",
} as const;

// Common API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh-token",
  PROFILE: "/auth/profile",

  // Users
  USERS: "/users",
  USER_BY_ID: (id: string) => `/users/${id}`,
} as const;

// Response Status
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
} as const;