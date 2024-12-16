"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const films_1 = __importDefault(require("./routes/films"));
const counter_1 = require("./utils/counter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
/* Middleware to count the number of GET requests */
let requestCount = 0;
app.use((req, _res, next) => {
    if (req.method === "GET") {
        requestCount++;
        console.log(`GET counter : ${requestCount}`);
    }
    next();
});
/* Challenge of ex1.2 */
app.use(counter_1.requestCounterMiddleware);
app.use("/films", films_1.default);
exports.default = app;
