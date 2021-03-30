import axios from 'axios';
import io from 'socket.io-client';

const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:9000';

export const server = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: true,
});

export const socket = io(baseUrl === '' ? '/' : baseUrl);
socket.on('connect', () => {
  console.log(`Socket Connected: ${socket.id}`);
});
socket.connect();
export default server;
