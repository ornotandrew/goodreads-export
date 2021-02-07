# Goodreads export

The built-in export tool on [Goodreads](https://goodreads.com) doesn't include
all of your information. This has been an
[issue](https://help.goodreads.com/s/question/0D51H00004eObS5/goodreads-export-is-missing-some-information-and-sometimes-the-information-that-is-exported-is-incorrect-help)
for years.

This project aims to generate better exports via screen scraping. The schema is
still a work-in-progress, but currently the outputs look like this

```json
{
  "reviewId": 3608220474,
  "bookUrl": "https://www.goodreads.com/book/show/35231.Lord_of_Chaos",
  "timeline": {
    "shelved": "2020-10-22",
    "started": "2020-10-22",
    "finished": "2020-12-22",
    "progress": [
      { "percent": 0, "date": "2020-10-22" },
      { "percent": 27, "date": "2020-11-12" },
      { "percent": 89, "date": "2020-12-15" },
      { "percent": 100, "date": "2020-12-22" }
    ]
  },
  "book": {
    "description": "In this sequel to the phenomenal New York Times bestseller The Fires of Heaven, we plunge again into Robert Jordan's extraordinarily rich...",
    "imageUrl": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1480096417i/35231.jpg",
    "authorUrl": "https://www.goodreads.com/author/show/6252.Robert_Jordan",
    "isbn": 9780812513752,
    "pageCount": 1011,
    "title": "Lord of Chaos",
    "seriesUrl": "https://www.goodreads.com/series/41526-the-wheel-of-time"
  }
}
```

## Installation

```shell
npm install -g goodreads-export
```

## Usage

```shell
goodreads-export <id>
```

To find `<id>`, navigate to **My Books** while logged in to Goodreads. The URL of
that page contains the ID. For example,

```
https://www.goodreads.com/review/list/<id>?shelf=%23ALL%23
```

### Saving to a file

```shell
goodreads-export <id> > goodreads_books.json
```
