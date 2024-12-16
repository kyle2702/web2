"use strict";
/**
 * This file contains type guards for typescript
 * @param value
 * @returns
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFilm = exports.isNumber = exports.isString = void 0;
/**
 * Check if the value is a string and inform typescript of this
 * @param value
 * @returns
 */
const isString = (value) => {
    return typeof value === "string" || value instanceof String;
};
exports.isString = isString;
/* Check if the value is a number and inform typescript of this */
const isNumber = (value) => {
    return typeof value === "number" && isFinite(value);
};
exports.isNumber = isNumber;
/**
 * Check if the body is a new pizza
 * @param body
 * @returns boolean
 */
const isFilm = (body) => {
    if (!body ||
        typeof body !== "object" ||
        !("title" in body) ||
        !("director" in body) ||
        !("releaseYear" in body) ||
        typeof body.title !== "string" ||
        typeof body.director !== "string" ||
        typeof body.releaseYear !== "number" ||
        !body.title.trim() ||
        !body.director.trim()) {
        return false;
    }
    return true;
};
exports.isFilm = isFilm;
