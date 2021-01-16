"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var package_json_1 = __importDefault(require("../package.json"));
commander_1.program.version(package_json_1.default.version);
commander_1.program.parse(process.argv);
var options = commander_1.program.opts();
console.log(options);
