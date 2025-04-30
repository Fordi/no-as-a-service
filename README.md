# ❌ No-as-a-Service

<p align="center">
  <img src="https://raw.githubusercontent.com/hotheadhacker/no-as-a-service/main/assets/imgs/image.png" width="800" alt="No-as-a-Service Banner"/>
</p>


Ever needed a graceful way to say “no”?  
This tiny API returns random, generic, creative, and sometimes hilarious rejection reasons — perfectly suited for any scenario: personal, professional, student life, dev life, or just because.

Built for humans, excuses, and humor.

---

## 🚀 API Usage

**Base URL**
```
https://naas.isalman.dev/no
```

**Method:** `GET`  
**Rate Limit:** `10 requests per minute per IP`

### 🔄 Example Request
```http
GET /no
```

### ✅ Example Response
```json
{
  "reason": "This feels like something Future Me would yell at Present Me for agreeing to."
}
```

Use it in apps, bots, landing pages, Slack integrations, rejection letters, or wherever you need a polite (or witty) no.

---

## 🛠️ Self-Hosting

Want to run it yourself? It’s lightweight and simple.

### 1. Clone this repository
```bash
git clone https://github.com/hotheadhacker/no-as-a-service.git
cd no-as-a-service
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server
```bash
npm start
```

The API will be live at:
```
http://localhost:3000/no
```

You can also change the port using an environment variable:
```bash
PORT=5000 npm start
```

You can disable / configure rate limiting by starting with the `LIMIT_RATE` environment variable
```bash
LIMIT_RATE=0 npm start # start with limiting disabled
LIMIT_RATE=20 npm start # start with limit at 20 requests per minute
```

---

## 📁 Project Structure

```
no-as-service/
├── index.js            # Express API
├── reasons.json        # 1000+ universal rejection reasons
├── package.json
└── README.md
```

---

## 📦 package.json

For reference, here’s the package config:

```json
{
  "name": "no-as-service",
  "version": "1.0.0",
  "description": "A lightweight API that returns random rejection or no reasons.",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "hotheadhacker",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "express-rate-limit": "^7.0.0"
  }
}
```

---

## 👤 Author

Created with creative stubbornness by [hotheadhacker](https://github.com/hotheadhacker)

---

## 📄 License

MIT — do whatever, just don’t say yes when you should say no.


---

## ⛙ Contributing

1. To contribute new reasons, fork and clone locally.  
2. "No" reasons are in `reasons.json`.  To add new ones, simply add them to the relevant language section, and run `npm run deduplicate` to deduplicate and sort the list (so that multiple peoples' contributions will tend not to overlap). `default` is English.
3. Then commit, push, and start your PR.
