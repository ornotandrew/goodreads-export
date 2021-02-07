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
exports.book = void 0;
var meta_1 = __importDefault(require("./meta"));
var dataBox_1 = __importDefault(require("./dataBox"));
function book(html) {
    // Goodreads adds some of the more important fields as <meta> tags at the top
    // of the page - grab as many of these as we can. There is a "title" field
    // here, but we prefer to get that info from the "bookDataBox" below, since
    // it splits the title and series.
    var metaValues = meta_1.default(html);
    // There are more fields in a pseudo-table underneath the "Get a copy"
    // section.
    var dataBoxValues = dataBox_1.default(html);
    return __assign(__assign({}, metaValues), dataBoxValues);
}
exports.book = book;
