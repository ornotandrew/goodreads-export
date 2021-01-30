"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewInfo = exports.getAllReviewIds = void 0;
var goodreads_1 = require("./goodreads");
var parse = __importStar(require("./parse"));
function getAllReviewIds(listId) {
    return __awaiter(this, void 0, void 0, function () {
        var allReviewIds, page, _a, reviewIds, progress, isLastPage, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    allReviewIds = [];
                    page = 1;
                    _d.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    _c = (_b = parse).reviewIds;
                    return [4 /*yield*/, goodreads_1.getListPage(listId, page)];
                case 2:
                    _a = _c.apply(_b, [_d.sent()]), reviewIds = _a.reviewIds, progress = _a.progress, isLastPage = _a.isLastPage;
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
        var parsed, _a, _b, timeline;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = parse).review;
                    return [4 /*yield*/, goodreads_1.getReview(reviewId)];
                case 1:
                    parsed = _b.apply(_a, [_c.sent()]);
                    timeline = {
                        shelved: parsed.shelved,
                        started: parsed.started || null,
                        finished: parsed.finished || null,
                        progress: []
                    };
                    timeline.started && timeline.progress.push({ percent: 0, date: timeline.started });
                    timeline.finished && timeline.progress.push({ percent: 100, date: timeline.finished });
                    Object.entries(parsed).forEach(function (_a) {
                        var progressDescription = _a[0], date = _a[1];
                        if (progressDescription in timeline) {
                            return;
                        }
                        timeline.progress.push({
                            percent: parseFloat(progressDescription),
                            date: date
                        });
                    });
                    timeline.progress.sort(function (a, b) { return a.percent < b.percent ? -1 : 1; });
                    return [2 /*return*/, { reviewId: reviewId, timeline: timeline }];
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
                    return [2 /*return*/, Promise.all(reviewIds.map(getReviewInfo))
                        // await getReviewInfo(3741591694)
                    ];
            }
        });
    });
}
exports.default = extract;
