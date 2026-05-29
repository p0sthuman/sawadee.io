# Sawadee Deployment & Setup Guide

## Current Status
✅ Version ready for deployment with all core features working.

## Known Issues & Setup Required

### Partner Affiliate Links
Some partner links currently redirect to main pages or show 404s because they lack affiliate account setup. This is expected behavior during development.

**Status:**
- ✅ **Booking.com** — Fully functional
- ⚠️ **Agoda** — Needs affiliate account to get proper redirect URLs
- ❌ **12Go** — Needs affiliate account & proper endpoint
- ❌ **Klook** — Needs affiliate account to generate valid search links
- ❌ **KKday** — Needs affiliate account to generate valid search links
- ❌ **GetYourGuide** — Needs affiliate account to generate valid search links

### To Fix Affiliate Links (Production Setup)

1. **Agoda Affiliate Program**
   - URL: https://agoda.com/partners
   - Get: Affiliate ID / Partnership ID
   - Update in `index.html`:
     ```javascript
     function agodaUrl(c,ci,co,r,a){
       return `https://www.agoda.com/en-en/search?ss=${encodeURIComponent(ALL_CITIES[c].name+' Thailand')}&checkin=${ci}&checkout=${co}&rooms=${r}&adults=${a}&affiliateID=YOUR_AFFILIATE_ID`;
     }
     function agodaFlightUrl(fi,ti,d,a){
       return `https://www.agoda.com/en-en/flights?dep=${fi}&arr=${ti}&date=${d}&adults=${a}&cabin=Economy&affiliateID=YOUR_AFFILIATE_ID`;
     }
     ```

2. **Booking.com Affiliate (Already working)**
   - URL: https://affiliate.booking.com
   - Current setup: Generic search URLs work fine

3. **12Go Affiliate Program**
   - URL: https://12go.asia/affiliate
   - Get: Affiliate tracking parameters
   - Update in `index.html`:
     ```javascript
     function go12Url(f,t,d,p){
       const fc=ALL_CITIES[f],tc=ALL_CITIES[t];
       return `https://12go.asia/en/search?from=${fc.slug||fc.iata.toLowerCase()}&to=${tc.slug||tc.iata.toLowerCase()}&date=${d}&pax=${p}&affiliateID=YOUR_12GO_ID`;
     }
     ```

4. **Klook Affiliate Program**
   - URL: https://www.klookaffiliates.com
   - Get: Affiliate ID & subdomain
   - Update in `index.html`:
     ```javascript
     function klookUrl(k){
       return `https://www.klook.com/en-US/search/results?keyword=${encodeURIComponent(k)}&affiliateID=YOUR_KLOOK_ID`;
     }
     ```

5. **KKday Affiliate Program**
   - URL: https://affiliates.kkday.com
   - Get: Affiliate tracking code
   - Update in `index.html`:
     ```javascript
     function kkdayUrl(k){
       return `https://www.kkday.com/search?keyword=${encodeURIComponent(k)}&affiliateCode=YOUR_KKDAY_CODE`;
     }
     ```

6. **GetYourGuide Affiliate Program**
   - URL: https://affiliates.getyourguide.com
   - Get: Affiliate ID
   - Update in `index.html`:
     ```javascript
     function gygUrl(k){
       return `https://www.getyourguide.com/search?q=${encodeURIComponent(k)}&affiliateId=YOUR_GYG_ID`;
     }
     ```

## Deployment Instructions

### GitHub Pages Deployment
```bash
# 1. Commit all changes
git add .
git commit -m "Add SEO, footer pages, and partner links"

# 2. Push to main branch
git push origin main

# 3. GitHub Pages should auto-deploy from main or gh-pages branch
# Check Settings > Pages in your repository
```

### Local Testing
```bash
# Start local server
node server.js

# Visit http://localhost:3000
```

## Files Modified/Created

### Modified
- `index.html` — Added SEO meta tags, structured data, footer links, improved typography

### Created
- `about.html` — About page with mission & how it works
- `faqs.html` — FAQ page with 9 expandable items
- `contact.html` — Contact form & contact info
- `sitemap.xml` — XML sitemap for SEO
- `robots.txt` — Search engine crawling rules
- `favicon` — SVG Thai character favicon

## Next Phase Recommendations

1. **Affiliate Account Setup** (Highest Priority)
   - Create accounts with all partners
   - Update affiliate IDs in URL functions

2. **Visual Assets** (Medium Priority)
   - Add partner logos (Agoda, Booking, Klook, 12Go, KKday, GetYourGuide)
   - Add destination preview images
   - Create Sawadee branding assets

3. **Live Price API Integration** (Future)
   - Research and integrate real-time pricing APIs
   - Replace static price tables

4. **Analytics & Tracking**
   - Set up Google Analytics
   - Track affiliate clicks & conversions

## Known Limitations

- Prices are **historical averages**, not live data
- Multi-city planning requires multiple searches
- No user accounts/saved trips (future feature)
- Contact form requires Formspree or similar service setup

---

**Last Updated:** May 28, 2026
**Version:** 1.0 (Ready for deployment)
