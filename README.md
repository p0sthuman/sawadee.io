# sawadee.io
Smart Thailand Travel Planner. Spend less time to plan your travel schedule.

## Live Affiliate Integration
This project now includes a lightweight Node.js backend to fetch live affiliate search pages for every user query.

### Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in your browser.

### Notes
- The frontend now requests live partner search content through `/api/compare`.
- If the live fetch fails, the app falls back to guide estimates.
