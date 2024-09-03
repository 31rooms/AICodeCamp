import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

let AUTH_TOKEN = '';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  program_id: number | null;
}

interface Program {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  students: Student[];
}

interface Student {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    program_id: number;
    student_id: number;
    registration_date: string;
  };
}

interface LoginResponse {
  data: {
    token: string;
    name: string;
  };
  message: string;
  success: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (AUTH_TOKEN) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${AUTH_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiService = {
  login: async (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
    try {
      const response = await api.post<LoginResponse>('/login', { email, password });
      console.log('Login API response:', response);
      return response;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  setToken: (token: string) => {
    AUTH_TOKEN = token;
  },

  getAllUsers: (): Promise<AxiosResponse<PaginatedResponse<User>>> => {
    return api.get('/users');
  },

  getUser: (id: number): Promise<AxiosResponse<ApiResponse<User>>> => {
    return api.get(`/users/${id}`);
  },

  createUser: (userData: Partial<User>): Promise<AxiosResponse<ApiResponse<User>>> => {
    return api.post('/users', userData);
  },

  updateUser: (id: number, userData: Partial<User>): Promise<AxiosResponse<ApiResponse<User>>> => {
    return api.put(`/users/${id}`, userData);
  },

  deleteUser: (id: number): Promise<AxiosResponse<ApiResponse<void>>> => {
    return api.delete(`/users/${id}`);
  },

  getAllPrograms: (): Promise<AxiosResponse<PaginatedResponse<Program>>> => {
    return api.get('/programs');
  },

  getProgram: (id: number): Promise<AxiosResponse<ApiResponse<Program>>> => {
    return api.get(`/programs/${id}`);
  },

  createProgram: (programData: Partial<Program>): Promise<AxiosResponse<ApiResponse<Program>>> => {
    return api.post('/programs', programData);
  },

  updateProgram: (id: number, programData: Partial<Program>): Promise<AxiosResponse<ApiResponse<Program>>> => {
    return api.put(`/programs/${id}`, programData);
  },

  deleteProgram: (id: number): Promise<AxiosResponse<ApiResponse<void>>> => {
    return api.delete(`/programs/${id}`);
  },

  getAllStudents: (): Promise<AxiosResponse<PaginatedResponse<Student>>> => {
    return api.get('/students');
  },

  getStudent: (id: number): Promise<AxiosResponse<ApiResponse<Student>>> => {
    return api.get(`/students/${id}`);
  },

  createStudent: (studentData: Partial<Student>): Promise<AxiosResponse<ApiResponse<Student>>> => {
    return api.post('/students', studentData);
  },

  updateStudent: (id: number, studentData: Partial<Student>): Promise<AxiosResponse<ApiResponse<Student>>> => {
    return api.put(`/students/${id}`, studentData);
  },

  deleteStudent: (id: number): Promise<AxiosResponse<ApiResponse<void>>> => {
    return api.delete(`/students/${id}`);
  },

  getUserPrograms: (userId: number): Promise<AxiosResponse<PaginatedResponse<Program>>> => {
    return api.get(`/users/${userId}/programs`);
  },
};

export default apiService;