import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  }
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (username, password) =>
  API.post('/api/auth/token/', { username, password });

export const getStudents = () => API.get('/api/students/').catch(() => ({data:{results:[]}}));
export const addStudent = (data) => API.post('/api/students/', data);
export const getAttendance = () => API.get('/api/attendance/').catch(() => ({data:{results:[]}}));
export const getFees = () => API.get('/api/fees/').catch(() => ({data:{results:[]}}));
export const chatWithAI = (message, studentId, history) =>
  API.post('/api/ai/chat/', { message, student_id: studentId, history });
export const generateReportCard = (studentId) =>
  API.post('/api/ai/report-card/', { student_id: studentId });
export const runFeeRiskScan = () =>
  API.post('/api/ai/fee-risk/bulk/').catch(() => ({data:{scored:0}}));
export const sendAttendanceAlerts = (threshold = 75) =>
  API.post('/api/ai/attendance-alerts/', { threshold }).catch(() => ({data:{alerts_sent:0}}));

export default API;
