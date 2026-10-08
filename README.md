# SmartTools AI

Premium vanilla HTML/CSS/JavaScript multi-tool website.

## Tools
- AI Content Detector
- Live Cricket
- URL Safety / Phishing Checker

## Run
Open `index.html` directly in a modern browser. No Node.js, React, Vite, Webpack, Bootstrap, Tailwind or jQuery required.

## API security
Only public Supabase Edge Function URLs are used in the frontend. No RapidAPI key, service role key or Supabase secret is included.

## Notes
- AI detector enforces a 30-word minimum.
- Cricket data loads on page open and refreshes every 60 seconds; manual refresh is available.
- Cricket search covers team names, series, venue and match type.
- URL checker never automatically opens the submitted URL.
