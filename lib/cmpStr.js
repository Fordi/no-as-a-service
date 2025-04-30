/**
 * Core sort comparator for strings / numbers
 * @param {T} a 
 * @param {T} b 
 * @returns {number} -1 if a is before b, 1 if b is before a, 0 if they're equivalent.
 */
export default function cmpStr(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}