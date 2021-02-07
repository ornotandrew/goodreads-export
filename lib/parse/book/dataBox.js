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
var cheerio_1 = __importDefault(require("cheerio"));
var boxValueConfig = {
    'Original Title': {
        parse: function ($) { return $.text(); },
        name: 'title'
    },
    Series: {
        parse: function ($) { return "https://www.goodreads.com" + $.children('a')[0].attribs.href; },
        name: 'seriesUrl'
    }
};
function getDataBoxValues(html) {
    var ast = cheerio_1.default.load(html);
    return ast('#bookDataBox .clearFloats').toArray()
        .reduce(function (acc, el) {
        var _a;
        var row = cheerio_1.default.load(el.children);
        var key = row('.infoBoxRowTitle').text().trim();
        var config = boxValueConfig[key];
        if (config === undefined) {
            return acc;
        }
        return __assign(__assign({}, acc), (_a = {}, _a[config.name] = config.parse(row('.infoBoxRowItem')), _a));
    }, {});
}
exports.default = getDataBoxValues;
