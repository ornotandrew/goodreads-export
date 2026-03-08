# Goodreads export

![npm version](https://img.shields.io/npm/v/goodreads-export)
![tests](https://img.shields.io/badge/tests-passing-brightgreen)

The [built-in export tool](https://www.goodreads.com/review/import) on
Goodreads doesn't include all of your information. This has been an
[issue](https://help.goodreads.com/s/question/0D51H00004eObS5/goodreads-export-is-missing-some-information-and-sometimes-the-information-that-is-exported-is-incorrect-help)
for years.

This project aims to generate better exports via screen scraping. Simply
specify your [list ID](#usage) and a JSON export will be generated.

## Output

An [Extract](src/types.ts) object. For a full connected "graph" of reviews and metadata, see [reviewsFromExtract](src/util/transform.ts).

## Installation

```shell
npm install -g goodreads-export
```

## Usage

### Basic Export

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

### Authentication

Goodreads now requires authentication to access your review list. You need to
provide cookies from your browser:

1. Open Goodreads in your browser (while logged in)
2. Open Developer Tools (F12 or right-click → Inspect)
3. Go to Application → Cookies → https://www.goodreads.com
4. Copy the cookie values (at minimum: `session_id`, `session-token`, `ccsid`)
5. Pass them with the `--cookies` flag:

```shell
goodreads-export {list_id} --cookies "session_id=xxx; session-token=yyy; ccsid=zzz" > export.json
```

### Incremental Export

For faster subsequent exports, use `--existing-extract` to only fetch new books:

```shell
goodreads-export {list_id} --cookies "..." --existing-extract export.json > export-new.json
```

This compares your current Goodreads list with the existing export and only fetches
metadata for new books. Books that have been removed from Goodreads will be
automatically excluded.

## Options

| Flag | Short | Description |
|------|-------|-------------|
| `--cookies` | `-c` | Cookie string from browser DevTools |
| `--existing-extract` | `-e` | Path to existing extract.json for incremental export |

## Output Format

The export JSON contains:

- `reviews` - Array of reviews with timeline (shelved, started, finished dates)
- `booksByUrl` - Book metadata (title, author, description, cover, ISBN, etc.)
- `authorsByUrl` - Author info (name, birth/death dates, genres, website)
- `seriesByUrl` - Series info (name, number of works)
