/**
 * Parse a string arg to an int, with a default / fallback value, and an optionally clamped range
 * @param {string} value
 * @param {number} def 
 * @param {number} min 
 * @param {number} max 
 * @returns {number} the parsed, clamped integer, or the default
 */
export default function intArg(value, def = 0, min = -Infinity, max = Infinity) {
  const parsed = parseInt(value);
  if (isNaN(parsed)) return def;
  return Math.min(max, Math.max(min, value));
};

