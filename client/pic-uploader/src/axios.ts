import axios from 'axios';

const base_url = 'http://localhost:3000'
// const AUTH_TOKEN = localStorage.getItem('token') 
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDk0NTk5NTgsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MDkzNzM1NTh9.D_6Xe0bvSP8czFig2muySimsenn41m6_5chwCBUOBi0'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['x-auth-token'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axios