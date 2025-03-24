/* istanbul ignore file */
import axios from 'axios';
import axiosRetry from 'axios-retry';
import fs from 'fs';
import path from 'path';

axiosRetry(axios, { retries: 3 });

// Create cache directory if it doesn't exist
const cacheDir = path.resolve(process.cwd(), '.cache');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

export const getListPage = (listId: number, page: number) =>
  axios
    .get(`https://www.goodreads.com/review/list/${listId}?page=${page}`, {
      headers: { Accept: 'text/javascript' },
    })
    .then((resp) => resp.data);

export const getReview = (id: number) =>
  axios
    .get(`https://www.goodreads.com/review/show/${id}`, {
      headers: { Accept: 'text/html' },
    })
    .then((resp) => resp.data);

export const getGenericUrl = (url: string) => {
  // Create a valid filename from the URL
  const filename = url.replace(/[^A-Za-z0-9._-]/g, '_');
  const cachePath = path.resolve(cacheDir, filename);

  // Check if cached response exists
  if (fs.existsSync(cachePath)) {
    return Promise.resolve(fs.readFileSync(cachePath, 'utf8'));
  }

  // If not cached, fetch and cache the response
  return axios.get(url, { headers: { Accept: 'text/html' } }).then((resp) => {
    const data = resp.data;
    fs.writeFileSync(cachePath, data);
    return data;
  });
};
