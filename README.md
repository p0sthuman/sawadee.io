# sawadee.io
Smart Thailand Travel Planner. Spend less time to plan your travel schedule.

## Features
- 🌍 Compare transport, accommodation, and activities across 8 trusted partners
- 💰 Price estimates for all trip types (budget, comfort, luxury)
- 🎯 Customized itineraries with daily timeline
- 📱 Fully responsive design (mobile-first)
- ♿ SEO-optimized with structured data
- 🔗 Direct affiliate links to booking partners

## Quick Start

### Run locally
```bash
# Install dependencies
npm install

# Start server
npm start

# Open browser
http://localhost:3000
```

### Deploy to GitHub Pages
1. Update affiliate IDs in `index.html` (see DEPLOYMENT.md)
2. Push to main branch:
   ```bash
   git add .
   git commit -m "Deploy v1"
   git push origin main
   ```

## Supported Destinations
**Thailand:** Bangkok, Chiang Mai, Phuket, Koh Samui, Krabi, Chiang Rai, Ayutthaya, Hua Hin, Sukhothai, Koh Phangan, Koh Tao, Ko Lanta, Pai, Udon Thani, Pattaya

**International:** Singapore, Kuala Lumpur, Hong Kong, Tokyo, Seoul, Dubai, London, New York, Sydney, Paris, and more

## Partners
- 🏨 **Agoda** — Hotels & flights
- 🏨 **Booking.com** — Hotels (fully functional ✅)
- 🚌 **12Go** — Transport
- 🎫 **Klook** — Activities & tours
- 🎫 **KKday** — Activities & tours
- 🎫 **GetYourGuide** — Activities & tours

## Current Status
✅ **Ready for deployment** with all core features working.

⚠️ **Affiliate links** — Need affiliate account setup for production (see DEPLOYMENT.md for details)

## Technical Stack
- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend:** Node.js + Express (for affiliate link proxying)
- **Hosting:** GitHub Pages or Node server
- **Features:** Exchange rate API integration, responsive design, smooth animations

## Next Phase
1. Set up affiliate accounts with all partners
2. Add partner logos & destination images
3. Integrate live price APIs
4. Add analytics tracking

See `DEPLOYMENT.md` for complete setup instructions.
