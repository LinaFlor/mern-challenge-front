import axios from 'axios';

const BASE = 'http://localhost:3001';

export async function getFilesData(fileName) {
  const params = fileName ? { params: { fileName } } : {};
  const resp = await axios.get(`${BASE}/files/data`, params);
  return resp.data; 
}
