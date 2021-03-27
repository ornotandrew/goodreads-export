import axios from 'axios'

export const getListPage = (listId: number, page: number) => axios.get(
  `https://www.goodreads.com/review/list/${listId}?page=${page}`,
  { headers: { 'Accept': 'text/javascript' } }
).then(resp => resp.data)

export const getReview = (id: number) => axios.get(
  `https://www.goodreads.com/review/show/${id}`,
  { headers: { 'Accept': 'text/html' } }
).then(resp => resp.data)

export const getGenericUrl = (url: string) => axios.get(
  url,
  { headers: { 'Accept': 'text/html' } }
).then(resp => resp.data).catch(error => {
  if (error.response) {
    // Request made and server responded
    console.log(error.response.config.url)
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }
})
