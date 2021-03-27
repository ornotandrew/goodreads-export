"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.author = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
var luxon_1 = require("luxon");
// TODO: just pass the AST in directly (once cheerio exports the correct type)
function getTable(html) {
    var ast = cheerio_1.default.load(html);
    var table = {};
    var lastKey = null;
    ast('div.rightContainer > div.dataTitle, div.rightContainer > div.dataItem').each(function (_, child) {
        var _a;
        var elem = ast(child);
        if (elem.hasClass('dataTitle')) {
            lastKey = elem.text();
            table[lastKey] = null;
        }
        if (elem.hasClass('dataItem')) {
            // if there's an _external_ link inside the div, take the value from that instead
            var anchor = elem.children('a');
            var hasExternalHref = anchor && ((_a = anchor.attr('href')) === null || _a === void 0 ? void 0 : _a.startsWith('http'));
            table[lastKey] = hasExternalHref ? anchor.attr('href') : elem.text().trim();
        }
    });
    return table;
}
function author(html) {
    var _a;
    var ast = cheerio_1.default.load(html);
    var name = ast('h1.authorName span[itemprop="name"]').text().trim();
    var table = getTable(html);
    var parseDate = function (dateStr) { return dateStr ? luxon_1.DateTime.fromFormat(dateStr, 'LLLL d, yyyy').toISODate() : null; };
    return {
        name: name,
        birthDate: parseDate(table.Born),
        deathDate: parseDate(table.Died),
        genres: (_a = table.Genre) === null || _a === void 0 ? void 0 : _a.split(', '),
        websiteUrl: table === null || table === void 0 ? void 0 : table.Website,
        twitterUrl: table === null || table === void 0 ? void 0 : table.Twitter,
    };
}
exports.author = author;
