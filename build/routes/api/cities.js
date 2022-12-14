"use strict";
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
var express_1 = __importDefault(require("express"));
var dataBase_1 = __importDefault(require("../../Utility/dataBase"));
var path_1 = __importDefault(require("path"));
var fs_1 = require("fs");
var fs_2 = require("fs");
var sharp_1 = __importDefault(require("sharp"));
var city = express_1.default.Router();
city.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name, widthString, heightString, width, height, cityName, imageLoc, newLocation;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, req.query.name];
            case 1:
                name = _a.sent();
                widthString = req.query.width;
                heightString = req.query.height;
                //check if the width and height not a Number and parse them to valid numbers
                if (widthString) {
                    width = parseInt(widthString);
                }
                if (heightString) {
                    height = parseInt(heightString);
                }
                cityName = dataBase_1.default.includes(name);
                imageLoc = path_1.default.resolve('./') + "/assets/full/".concat(name, ".jpg");
                if (!(cityName === undefined)) return [3 /*break*/, 2];
                return [2 /*return*/, res
                        .status(400)
                        .send('Bad Request!! you should enter a valid city name ')];
            case 2:
                if (!(cityName === false)) return [3 /*break*/, 3];
                return [2 /*return*/, res
                        .status(404)
                        .send('sorry, The city name you have enterd not found')];
            case 3:
                if (!((0, fs_1.existsSync)(imageLoc) === false)) return [3 /*break*/, 4];
                return [2 /*return*/, res.status(404).send('Sorry, this city doese not have photo')];
            case 4:
                if (!(!height || !width)) return [3 /*break*/, 5];
                return [2 /*return*/, res.status(404).send('Please enter a valid height and width')];
            case 5:
                newLocation = path_1.default.resolve('./') + "/assets/thumbnail";
                if (!(0, fs_1.existsSync)(newLocation)) {
                    fs_2.promises.mkdir(path_1.default.resolve('./') + "/assets/thumbnail");
                }
                return [4 /*yield*/, (0, sharp_1.default)(imageLoc)
                        .resize(width, height)
                        .toFormat('png')
                        .toFile("".concat(newLocation, "/").concat(name, "_").concat(width, "_").concat(height, ".png"))
                    // send the resized image back to the user
                ];
            case 6:
                _a.sent();
                // send the resized image back to the user
                return [4 /*yield*/, res.sendFile("".concat(newLocation, "/").concat(name, "_").concat(width, "_").concat(height, ".png"))];
            case 7:
                // send the resized image back to the user
                _a.sent();
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.default = city;
