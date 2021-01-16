# Goodreads export

The built-in export tool on [Goodreads](https://goodreads.com) doesn't include
all of your information. This has been an
[issue](https://help.goodreads.com/s/question/0D51H00004eObS5/goodreads-export-is-missing-some-information-and-sometimes-the-information-that-is-exported-is-incorrect-help)
for years.

This project aims to generate better exports via screen scraping.

## Installation

```shell
npm install -g goodreads-export
```

## Usage

```shell
goodreads-export <ID>
```

To find `<ID>`, navigate to **My Books** while logged in to Goodreads. The URL of
that page contains the ID. For example,

```
https://www.goodreads.com/review/list/<ID>?shelf=%23ALL%23
```

### Saving to a file

```shell
goodreads-export <ID> > goodreads_books.json
```
