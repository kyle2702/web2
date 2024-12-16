"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCounterMiddleware = void 0;
/* Middleware to count the number of requests (GET, POST, DELETE...) */
const stats = {};
const requestCounterMiddleware = (req, _res, next) => {
    const currentOperation = `${req.method} ${req.path}`;
    const currentOperationCounter = stats[currentOperation];
    if (currentOperationCounter === undefined)
        stats[currentOperation] = 0;
    stats[currentOperation] += 1;
    const statsMessage = `Request counter : \n${Object.keys(stats)
        .map((operation) => `- ${operation} : ${stats[operation]}`)
        .join("\n")}
      `;
    console.log(statsMessage);
    next();
};
exports.requestCounterMiddleware = requestCounterMiddleware;
