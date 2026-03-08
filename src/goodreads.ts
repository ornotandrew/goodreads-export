/* istanbul ignore file */
import axios from 'axios';
import axiosRetry from 'axios-retry';
import fs from 'fs';
import path from 'path';

axiosRetry(axios, { retries: 3 });

// User-Agent to appear as a real browser
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Default headers for all requests
axios.defaults.headers.common['User-Agent'] = USER_AGENT;

let cookies = '';

// Export function to set cookies (call this after getting them from CLI)
export const setCookies = (cookieString: string) => {
  cookies = cookieString;
  axios.defaults.headers.common['Cookie'] = cookies;
};

// Helper to get headers with current cookies
const getHeaders = (extraHeaders = {}) => ({
  ...extraHeaders,
  Cookie: cookies,
});

// Create cache directory if it doesn't exist
const cacheDir = path.resolve(process.cwd(), '.cache');
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

export const getListPage = (listId: number, page: number) =>
  axios
    .get(`https://www.goodreads.com/review/list/${listId}?page=${page}`, {
      headers: getHeaders({ Accept: 'text/javascript' }),
    })
    .then((resp) => resp.data);

export const getReview = (id: number) =>
  axios
    .get(`https://www.goodreads.com/review/show/${id}`, {
      headers: getHeaders({ Accept: 'text/html' }),
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
  return axios.get(url, { headers: getHeaders({ Accept: 'text/html' }) }).then((resp) => {
    const data = resp.data;
    fs.writeFileSync(cachePath, data);
    return data;
  });
};
