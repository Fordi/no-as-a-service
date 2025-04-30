/**
 * Shuffle an iterable into a new array
 * @param {any[]} array Array of items
 * @returns {any[]} The shuffled array
 */
export default function toShuffled(array) {
  return [...array].toSorted(() => Math.random() > 0.5 ? 1 : -1);
}
