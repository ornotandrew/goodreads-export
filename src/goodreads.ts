import axios from 'axios'

export const getListPage = (listId: number, page: number) => axios.get(
  `https://www.goodreads.com/review/list/${listId}?page=${page}`,
  { headers: { 'Accept': 'text/javascript' } }
).then(resp => resp.data)

export const getReview = (id: number) => axios.get(
  `https://www.goodreads.com/review/show/${id}`,
  { headers: { 'Accept': 'text/html' } }
).then(resp => resp.data)

export const getBook = (url: string) => axios.get(
  url,
  { headers: { 'Accept': 'text/html' } }
).then(resp => resp.data)
