import express from "express";
import rateLimit from "express-rate-limit";
import toShuffled from "../lib/toShuffled.js";
import parseLanguages from "../lib/parseLanguages.js";
import { reasons } from "../lib/reasons.js";
import parseOptions from "../lib/parseOptions.js";

const app = express();
const options = parseOptions(process.env, process.argv.slice(2));

// A copy of the "reasons" deck to pluck items from.
let decks = {};
for (const [key, value] of Object.entries(reasons)) {
  decks[key] = toShuffled(value);
}

// Rate limiter: default is 10 requests per minute per IP
if (options.rate !== 0) {
  console.info(`Applying rate limit of ${options.rate} per IP per minute`);
  app.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: options.rate,
    message: { error: "Too many requests, please try again later." }
  }));
} else {
  console.info(`Rate limit disabled`);
}

// Random rejection reason endpoint
app.get('/no', (req, res) => {
  const language = parseLanguages(req.headers['accept-language']).find(lang => lang in decks) ?? 'default';
  const deck = decks[language];
  // Deck is empty; reshuffle
  if (deck.length === 0) {
    deck = toShuffled(reasons[language]);
  }
  const reason = deck.shift();
  res.json({ reason });
});

// Start server
app.listen(options.port, () => {
  console.info(`No-as-a-Service is running on port ${options.port}`);
});
