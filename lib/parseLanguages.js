/**
 * Parse an `accept-language` header into an ordered list of accepable languages
 * @param {string} langHeader 
 * @returns {string[]} the list of languages
 */
export default function parseLanguages(langHeader) {
  const langs = new Set();
  for (const group of langHeader.split(';')) {
    for (const item of group.split(',')) {
      const spec = item.trim();
      if (spec.startsWith('q=')) continue;
      if (spec === '*') continue;
      langs.add(spec);
      if (spec.indexOf('-') !== -1) {
        langs.add(spec.split('-')[0]);
      }
    }
  }
  return [...langs];
}