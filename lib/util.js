"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exit = exports.barOptions = exports.multibar = void 0;
var chalk_1 = require("chalk");
var cli_progress_1 = __importDefault(require("cli-progress"));
exports.multibar = new cli_progress_1.default.MultiBar({
    clearOnComplete: true,
    hideCursor: true,
    stream: process.stderr,
    format: [
        '{description}',
        chalk_1.stderr.grey('{bar}'),
        chalk_1.stderr.bold('{percentage}%'),
        chalk_1.stderr.grey('[{value}/{total}]')
    ].join(' ')
}, cli_progress_1.default.Presets.shades_classic);
exports.barOptions = function (description, emoji) { return ({
    description: description.padEnd(15) + emoji
}); };
exports.exit = function (error) {
    exports.multibar.stop();
    if (error) {
        console.error(error.stack);
    }
    process.exit(1);
};
process.on('SIGINT', function () { return exports.exit(); });
