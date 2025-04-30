const { readFileSync, writeFileSync } = require("fs");

/**
 * Core sort comparator for strings / numbers
 * @param {T} a 
 * @param {T} b 
 * @returns {number} -1 if a is before b, 1 if b is before a, 0 if they're equivalent.
 */
const cmpStr = (a, b) => a < b ? -1 : a > b ? 1 : 0;

/**
 * Sort and deduplicate a complex object / list (see normalizeObject and normalizeList for rules)
 * @param {any[]} item 
 * @returns {any[]} the normalized list
 */
function normalize(item) {
  if (Array.isArray(item)) {
    return normalizeList(item);
  }
  if (typeof item === 'object' && item !== null) {
    return normalizeObject(item);
  }
  return item;
}

/**
 * Sort an object by its keys, recursively renormalizing its values, putting "default" first if present.
 * @param {Record<string, T>} obj 
 * @returns {Record<string, T>} the sorted object
 */
function normalizeObject(obj) {
  const copy = {};
  const sortedKeys = Object.keys(obj).toSorted((a, b) => {
    if (a === 'default') return -1;
    if (b === 'default') return 1;
    return cmpStr(a, b);
  });
  for (const key of sortedKeys) {
    copy[key] = normalize(obj[key]);
  }
  return copy;
}

/**
 * Sort an array, case insensitive, and deduplicate it
 * @param {T[]} items Items to sort
 * @returns {T[]} the deduplicated and sorted object
 */
function normalizeList(items) {
  return (
    [...new Set(items)]
      .toSorted((a, b) => {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return cmpStr(a, b);
      })
      .map(normalize)
  );
}

const reasons = JSON.parse(readFileSync("./reasons.json", "utf8"));
const normalized = normalize(reasons);
writeFileSync("./reasons.json", JSON.stringify(normalized, null, 2), "utf8");
