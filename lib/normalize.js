import cmpStr from "./cmpStr.js";

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

/**
 * Sort and deduplicate a complex object / list (see normalizeObject and normalizeList for rules)
 * @param {any[]} item 
 * @returns {any[]} the normalized list
 */
export default function normalize(item) {
  if (Array.isArray(item)) {
    return normalizeList(item);
  }
  if (typeof item === 'object' && item !== null) {
    return normalizeObject(item);
  }
  return item;
}
