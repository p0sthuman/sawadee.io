const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

const THAI_CITIES = {
  bangkok: { name: 'Bangkok', iata: 'BKK', slug: 'bangkok' },
  'chiang-mai': { name: 'Chiang Mai', iata: 'CNX', slug: 'chiang-mai' },
  phuket: { name: 'Phuket', iata: 'HKT', slug: 'phuket' },
  'koh-samui': { name: 'Koh Samui', iata: 'USM', slug: 'koh-samui' },
  pattaya: { name: 'Pattaya', iata: 'BKK', slug: 'pattaya' },
  krabi: { name: 'Krabi', iata: 'KBV', slug: 'krabi' },
  'chiang-rai': { name: 'Chiang Rai', iata: 'CEI', slug: 'chiang-rai' },
  ayutthaya: { name: 'Ayutthaya', iata: 'BKK', slug: 'ayutthaya' },
  'hua-hin': { name: 'Hua Hin', iata: 'BKK', slug: 'hua-hin' },
  sukhothai: { name: 'Sukhothai', iata: 'THQ', slug: 'sukhothai' },
  'koh-phangan': { name: 'Koh Phangan', iata: 'USM', slug: 'koh-phangan' },
  'koh-tao': { name: 'Koh Tao', iata: 'USM', slug: 'koh-tao' },
  'ko-lanta': { name: 'Ko Lanta', iata: 'KBV', slug: 'ko-lanta' },
  'udon-thani': { name: 'Udon Thani', iata: 'UTH', slug: 'udon-thani' }
};

const INTL_CITIES = {
  dubai: { name: 'Dubai', iata: 'DXB', slug: 'dubai' },
  london: { name: 'London', iata: 'LHR', slug: 'london' },
  'new-york': { name: 'New York', iata: 'JFK', slug: 'new-york' },
  sydney: { name: 'Sydney', iata: 'SYD', slug: 'sydney' },
  paris: { name: 'Paris', iata: 'CDG', slug: 'paris' },
  mumbai: { name: 'Mumbai', iata: 'BOM', slug: 'mumbai' },
  beijing: { name: 'Beijing', iata: 'PEK', slug: 'beijing' },
  taipei: { name: 'Taipei', iata: 'TPE', slug: 'taipei' },
  osaka: { name: 'Osaka', iata: 'KIX', slug: 'osaka' },
  jakarta: { name: 'Jakarta', iata: 'CGK', slug: 'jakarta' },
  manila: { name: 'Manila', iata: 'MNL', slug: 'manila' },
  'ho-chi-minh': { name: 'Ho Chi Minh City', iata: 'SGN', slug: 'ho-chi-minh' },
  hanoi: { name: 'Hanoi', iata: 'HAN', slug: 'hanoi' },
  frankfurt: { name: 'Frankfurt', iata: 'FRA', slug: 'frankfurt' },
  istanbul: { name: 'Istanbul', iata: 'IST', slug: 'istanbul' }
};

const ALL_CITIES = { ...THAI_CITIES, ...INTL_CITIES };

const buildUrls = {
  agodaHotel: (city, ci, co, rooms, adults) =>
    `https://www.agoda.com/en-en/search?ss=${encodeURIComponent(ALL_CITIES[city].name + ' Thailand')}&checkin=${ci}&checkout=${co}&rooms=${rooms}&adults=${adults}`,
  bookingHotel: (city, ci, co, rooms, adults) =>
    `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(ALL_CITIES[city].name + ', Thailand')}&checkin=${ci}&checkout=${co}&group_adults=${adults}&no_rooms=${rooms}`,
  go12Transport: (from, to, date, pax) =>
    `https://12go.asia/en/search?from=${ALL_CITIES[from].slug || ALL_CITIES[from].iata.toLowerCase()}&to=${ALL_CITIES[to].slug || ALL_CITIES[to].iata.toLowerCase()}&date=${date}&pax=${pax}`,
  klook: (query) =>
    `https://www.klook.com/en-US/search/results?keyword=${encodeURIComponent(query + ' Thailand')}`,
  kkday: (query) =>
    `https://www.kkday.com/en-us/search?keyword=${encodeURIComponent(query)}`,
  gyg: (query) =>
    `https://www.getyourguide.com/search?q=${encodeURIComponent(query + ' Thailand')}`
};

function cleanupText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    return {
      ok: res.ok,
      status: res.status,
      title: title || 'Live partner search',
      snapshot: cleanupText(html).slice(0, 240)
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      title: 'Live fetch failed',
      snapshot: String(error).slice(0, 240)
    };
  }
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static(path.join(__dirname)));

app.get('/api/compare', async (req, res) => {
  const {
    departure,
    destination,
    checkIn,
    checkOut,
    guests = '2',
    rooms = '1'
  } = req.query;

  if (!departure || !destination || !checkIn || !checkOut) {
    return res.status(400).json({ error: 'departure, destination, checkIn and checkOut are required' });
  }

  const liveEntries = [
    {
      partner: 'Agoda Hotels',
      type: 'hotel',
      url: buildUrls.agodaHotel(destination, checkIn, checkOut, rooms, guests)
    },
    {
      partner: 'Booking.com Hotels',
      type: 'hotel',
      url: buildUrls.bookingHotel(destination, checkIn, checkOut, rooms, guests)
    },
    {
      partner: '12Go Transportation',
      type: 'transport',
      url: buildUrls.go12Transport(departure, destination, checkIn, guests)
    },
    {
      partner: 'Klook Activities',
      type: 'activity',
      url: buildUrls.klook(ALL_CITIES[destination].name)
    },
    {
      partner: 'KKday Activities',
      type: 'activity',
      url: buildUrls.kkday(ALL_CITIES[destination].name)
    },
    {
      partner: 'GetYourGuide Activities',
      type: 'activity',
      url: buildUrls.gyg(ALL_CITIES[destination].name)
    }
  ];

  const results = await Promise.all(
    liveEntries.map(async (entry) => {
      const preview = await fetchPage(entry.url);
      return {
        ...entry,
        ...preview
      };
    })
  );

  res.json({ query: { departure, destination, checkIn, checkOut, guests, rooms }, partners: results });
});

app.listen(PORT, () => {
  console.log(`Sawadee live affiliate proxy running at http://localhost:${PORT}`);
});
