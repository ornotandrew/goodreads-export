# Goodreads export

![npm version](https://img.shields.io/npm/v/goodreads-export)
![Lines](#lines#)
![tests](https://img.shields.io/badge/tests-passing-brightgreen)

The [built-in export tool](https://www.goodreads.com/review/import) on
Goodreads doesn't include all of your information. This has been an
[issue](https://help.goodreads.com/s/question/0D51H00004eObS5/goodreads-export-is-missing-some-information-and-sometimes-the-information-that-is-exported-is-incorrect-help)
for years.

This project aims to generate better exports via screen scraping. Simply
specify your [list ID](#usage) and a JSON export will be generated.

## Output

A list of [Extract](src/types.ts) objects.

## Installation

```shell
npm install -g goodreads-export
```

## Usage

```shell
goodreads-export {id}
```

To find `{id}`, navigate to **My Books** while logged in to Goodreads. The URL of
that page contains the ID. For example,

```
https://www.goodreads.com/review/list/{id}?shelf=%23ALL%23
```

### Saving to a file

```shell
goodreads-export {id} > goodreads_books.json
```
