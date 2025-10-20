import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});


/**
 * Gets file data from the backend.
 * @param {string} [fileName] optional filter by file name
 * @returns list of files
 */

export async function getFilesData(fileName) {
    try {
        let url = '/files/data';

        if (fileName) {
            url = `/files/data?file=${fileName}`;
        }

        const resp = await api.get(url);
        return resp.data;
    } catch (error) {
        console.error("Error fetching files data:", error);
        throw error;
    }
};
