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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewInfo = exports.getAllReviewIds = exports.getReviewIdsForPage = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
var goodreads_1 = require("./goodreads");
var luxon_1 = require("luxon");
function getReviewIdsForPage(listId, page) {
    return __awaiter(this, void 0, void 0, function () {
        var lines, dataLine, html, ast, aTags, reviewIds, statusLine, match, isLastPage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, goodreads_1.getListPage(listId, page)];
                case 1:
                    lines = (_a.sent()).split('\n');
                    dataLine = lines.find(function (l) { return l.startsWith('Element.insert'); });
                    html = dataLine.slice(38, dataLine.length - 4);
                    ast = cheerio_1.default.load(JSON.parse(html));
                    aTags = ast('a.nobreak');
                    if (aTags.length == 0) {
                        console.error(ast.html().slice(0, 50) + '...');
                        throw new Error('Couldn\'t find the expected HTML elements');
                    }
                    reviewIds = aTags.toArray().map(function (e) { return parseInt(/\d+/.exec(e.attribs.href)[0]); });
                    statusLine = lines.find(function (l) { return l.startsWith('Element.update'); });
                    match = /(\d+) of (\d+)/.exec(statusLine);
                    isLastPage = lines.includes('InfiniteScroll.isDone = true;');
                    return [2 /*return*/, { reviewIds: reviewIds, progress: match[0], isLastPage: isLastPage }];
            }
        });
    });
}
exports.getReviewIdsForPage = getReviewIdsForPage;
function getAllReviewIds(listId) {
    return __awaiter(this, void 0, void 0, function () {
        var allReviewIds, page, _a, reviewIds, progress, isLastPage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    allReviewIds = [];
                    page = 1;
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    return [4 /*yield*/, getReviewIdsForPage(listId, page)];
                case 2:
                    _a = _b.sent(), reviewIds = _a.reviewIds, progress = _a.progress, isLastPage = _a.isLastPage;
                    console.log(progress);
                    allReviewIds = allReviewIds.concat(reviewIds);
                    if (isLastPage) {
                        return [3 /*break*/, 3];
                    }
                    else {
                        page++;
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, allReviewIds];
            }
        });
    });
}
exports.getAllReviewIds = getAllReviewIds;
function getReviewInfo(reviewId) {
    return __awaiter(this, void 0, void 0, function () {
        var endash, whitespace, html, ast, rowText, rows, simplifyDescription, timeline;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endash = '–' // this is NOT the same as "-"
                    ;
                    whitespace = '[\n\s ]';
                    return [4 /*yield*/, goodreads_1.getReview(reviewId)];
                case 1:
                    html = _a.sent();
                    ast = cheerio_1.default.load(html);
                    rowText = ast('.readingTimeline div.readingTimeline__row > div.readingTimeline__text').text();
                    rows = rowText
                        .replace(new RegExp(whitespace + "*" + endash + whitespace + "*", 'g'), ' - ')
                        .replace(new RegExp(whitespace + "*:" + whitespace + "*", 'g'), ': ')
                        .replace(/ +/g, ' ')
                        .split('\n')
                        .filter(function (s) { return !/^\s*$/.exec(s); });
                    simplifyDescription = function (goodreadsDescription) {
                        var mapping = {
                            'Started Reading': 'started',
                            'Finished Reading': 'finished',
                            'Shelved': 'shelved'
                        };
                        return mapping[goodreadsDescription] || goodreadsDescription;
                    };
                    timeline = rows.reduce(function (acc, row) {
                        var _a;
                        var _b = row.split(' - '), dateStr = _b[0], description = _b[1];
                        var date = luxon_1.DateTime.fromFormat(dateStr, 'LLLL d, yyyy').toISODate();
                        return __assign(__assign({}, acc), (_a = {}, _a[date] = simplifyDescription(description), _a));
                    }, {});
                    return [2 /*return*/, { timeline: timeline }];
            }
        });
    });
}
exports.getReviewInfo = getReviewInfo;
function extract(listId) {
    return __awaiter(this, void 0, void 0, function () {
        var reviewIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllReviewIds(listId)];
                case 1:
                    reviewIds = _a.sent();
                    return [4 /*yield*/, Promise.all(reviewIds.map(getReviewInfo))
                        // await getReviewInfo(3741591694)
                    ];
                case 2:
                    _a.sent();
                    // await getReviewInfo(3741591694)
                    return [2 /*return*/, [{}]];
            }
        });
    });
}
exports.default = extract;
