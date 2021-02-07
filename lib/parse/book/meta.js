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
function getMetaContentByAttrib(html) {
    var ast = cheerio_1.default.load(html);
    var meta = ast('meta').toArray();
    return function (filter) {
        var _a;
        var matchingNode = meta.find(function (node) { return Object.entries(filter).every(function (_a) {
            var key = _a[0], value = _a[1];
            return node.attribs[key] === value;
        }); });
        return (_a = matchingNode === null || matchingNode === void 0 ? void 0 : matchingNode.attribs) === null || _a === void 0 ? void 0 : _a.content;
    };
}
function getMetaValues(html) {
    var metaLookup = {
        description: {
            search: { property: 'og:description' }
        },
        imageUrl: {
            search: { property: 'og:image' },
            transform: function (value) {
                var lastSlash = value.lastIndexOf('/');
                return value.slice(0, lastSlash) + value.slice(lastSlash).replace(/\..*.jpg/, '.jpg');
            }
        },
        authorUrl: {
            search: { property: 'books:author' }
        },
        isbn: {
            search: { property: 'books:isbn' },
            transform: parseInt
        },
        pageCount: {
            search: { property: 'books:page_count' },
            transform: parseInt
        },
    };
    var searchMetaContent = getMetaContentByAttrib(html);
    return Object.entries(metaLookup)
        .reduce(function (acc, _a) {
        var _b;
        var _c;
        var outputKey = _a[0], config = _a[1];
        var rawValue = searchMetaContent(config.search);
        var transform = (_c = config.transform) !== null && _c !== void 0 ? _c : (function (value) { return value; });
        return (__assign(__assign({}, acc), (_b = {}, _b[outputKey] = transform(rawValue), _b)));
    }, {});
}
exports.default = getMetaValues;
