"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenericUrl = exports.getReview = exports.getListPage = void 0;
var axios_1 = __importDefault(require("axios"));
exports.getListPage = function (listId, page) { return axios_1.default.get("https://www.goodreads.com/review/list/" + listId + "?page=" + page, { headers: { 'Accept': 'text/javascript' } }).then(function (resp) { return resp.data; }); };
exports.getReview = function (id) { return axios_1.default.get("https://www.goodreads.com/review/show/" + id, { headers: { 'Accept': 'text/html' } }).then(function (resp) { return resp.data; }); };
exports.getGenericUrl = function (url) { return axios_1.default.get(url, { headers: { 'Accept': 'text/html' } }).then(function (resp) { return resp.data; }); };
