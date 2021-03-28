# Goodreads export

![npm version](https://img.shields.io/npm/v/goodreads-export)
![Lines](https://img.shields.io/badge/Coverage-90.97%25-brightgreen.svg)
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

By default, the extract will be printed to `stdout`. To save the output to a
file, pipe the output.

```shell
goodreads-export {list_id} > goodreads_extract.json
```

To find `{list_id}`, navigate to **My Books** while logged in to Goodreads. The URL of
that page contains the ID. For example,

```
https://www.goodreads.com/review/list/{list_id}?shelf=%23ALL%23
```
