/**
 * This file contains type guards for typescript
 * @param value
 * @returns
 */

import { Film } from "../types";

/**
 * Check if the value is a string and inform typescript of this
 * @param value
 * @returns
 */
const isString = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};

/* Check if the value is a number and inform typescript of this */
const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && isFinite(value);
};

/**
 * Check if the body is a new pizza
 * @param body
 * @returns boolean
 */
const isFilm = (body: unknown): body is Film => {
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("releaseYear" in body) ||
    typeof (body as any).title !== "string" ||
    typeof (body as any).director !== "string" ||
    typeof (body as any).releaseYear !== "number" ||
    !(body as any).title.trim() ||
    !(body as any).director.trim()
  ) {
    return false;
  }

  return true;
};

export { isString, isNumber, isFilm };
