"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.review = exports.reviewIds = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
var luxon_1 = require("luxon");
var endash = '–'; // this is NOT the same as "-"
var whitespace = '[\n\s ]';
function reviewIds(jsText) {
    var lines = jsText.split('\n');
    // The line containing the actual HTML looks like the following:
    // Element.insert("booksBody", { bottom: "<the html>" });
    var dataLine = lines.find(function (l) { return l.startsWith('Element.insert'); });
    var html = dataLine.slice(38, dataLine.length - 4);
    var ast = cheerio_1.default.load(JSON.parse(html));
    var aTags = ast('a.nobreak');
    if (aTags.length == 0) {
        console.error(ast.html().slice(0, 50) + '...');
        throw new Error('Couldn\'t find the expected HTML elements');
    }
    var reviewIds = aTags.toArray().map(function (e) { return parseInt(/\d+/.exec(e.attribs.href)[0]); });
    // There's also a contextual line which looks like
    // Element.update("infiniteStatus", "60 of 131 loaded");
    var statusLine = lines.find(function (l) { return l.startsWith('Element.update'); });
    var match = /(\d+) of (\d+)/.exec(statusLine);
    // const [thisIndex, totalItems] = [match[1], match[2]].map(parseInt)
    // Finally, if this is the last page, we will also have the following line
    // InfiniteScroll.isDone = true;
    var isLastPage = lines.includes('InfiniteScroll.isDone = true;');
    return { reviewIds: reviewIds, progress: match[0], isLastPage: isLastPage };
}
exports.reviewIds = reviewIds;
function review(html) {
    var ast = cheerio_1.default.load(html);
    var rowText = ast('.readingTimeline div.readingTimeline__row > div.readingTimeline__text').text();
    var rows = rowText
        .replace(new RegExp(whitespace + "*page" + whitespace + "*\\d+" + whitespace + "*", 'g'), '')
        .replace(new RegExp(whitespace + "*" + endash + whitespace + "*", 'g'), ' - ')
        .replace(new RegExp(whitespace + "*:" + whitespace + "*", 'g'), ': ')
        .replace(/ +/g, ' ')
        .split('\n')
        .filter(function (s) { return !/^\s*$/.exec(s); });
    var simplifyDescription = function (goodreadsDescription) {
        var mapping = {
            'Started Reading': 'started',
            'Finished Reading': 'finished',
            'Shelved': 'shelved'
        };
        return mapping[goodreadsDescription] || goodreadsDescription;
    };
    return rows.reduce(function (acc, row) {
        var _a;
        var _b = row.split(' - '), dateStr = _b[0], description = _b[1];
        var date = luxon_1.DateTime.fromFormat(dateStr, 'LLLL d, yyyy').toISODate();
        return __assign(__assign({}, acc), (_a = {}, _a[simplifyDescription(description)] = date, _a));
    }, {});
}
exports.review = review;
