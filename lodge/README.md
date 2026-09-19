# Krishna Grand — lodge website and reception desk system

A complete, working sample IT setup for **Krishna Grand**, a mid-budget lodge
under construction at Y.S. Nagar, Chinna Chauku, Kadapa (YSR Kadapa district,
Andhra Pradesh).

Two pieces, both plain HTML/CSS/JavaScript. No build step, no server, no
monthly fee, no framework to keep updated.

| Folder | What it is | Who uses it |
|---|---|---|
| `site/` | Public website — rooms, tariff, amenities, distances, WhatsApp booking | Guests, on their phones |
| `pms/` | Reception desk system — room board, check-in/out, guest register, reports | Front desk staff |
| `docs/` | Sales playbook and launch checklist | The owner |

---

## Run it right now

Open `site/index.html` in any browser. That is the whole setup.

To test properly (some browser features need a real server):

```bash
npx http-server . -p 8080
# website:        http://localhost:8080/site/
# reception desk: http://localhost:8080/pms/
```

The reception desk loads with ~45 days of realistic sample bookings the first
time you open it, so the reports are not empty while you are evaluating it.

---

## Making it real

**Everything guest-facing lives in one file: `site/config.js`.**

Business name, phone numbers, WhatsApp number, address, room types, prices,
amenities, distances, offers, policies, UPI ID. Change a value there, reload,
it is live. You should not need to touch HTML or CSS to launch.

The reception desk reads the same file, so room types and prices stay in sync
automatically.

### Before going live, these must be fixed

Three things in `config.js` are deliberately marked unverified. The code is
built to behave honestly while they are: unmeasured distances render with a
`~`, and no map coordinates are published to Google at all.

1. **`geo`** — placeholder coordinates for central Kadapa, **not the plot**.
   The Google Maps link this was built from points at the *Care dental*
   listing, which is about **50 m from the actual building**. Do not reuse it.
   Stand at the lodge gate, long-press the spot in Google Maps, copy the
   lat/long, paste them in, set `verified: true`.
2. **`distances`** — plausible estimates, not measurements. Open Maps
   Directions from the lodge to each place, copy the real km and minutes, set
   `verified: true` on each. This is the most-read block on the whole site.
3. **`reviews`** — sample text. **Delete them until you have real ones**, then
   paste real Google reviews. Never invent reviews on a live site.

Also replace: `phone`, `whatsapp`, `email`, `upi.id`, `reviewLink` (from your
Google Business Profile), and every photo in `site/img/`.

### Photos

`site/img/` holds labelled placeholders — each one says which real photo
replaces it. Street View screenshots cannot be used: they carry Google's
watermark and UI, and they show neighbouring businesses.

See `docs/LAUNCH-CHECKLIST.md` for the shot list. Landscape, bright daylight,
1600×1200 or larger, `.jpg`. Keep the same filenames and nothing else needs
changing.

---

## Hosting

The website is static files, so it hosts free on GitHub Pages, Netlify or
Cloudflare Pages. Point a domain at it when you have one.

Do **not** put `pms/` on the public internet as-is — it has no login, and it
holds guest ID numbers. Run it from the reception computer or tablet, or put
it behind a password if it must be online.

---

## How the reception desk stores data

Data lives in `localStorage` **on that one device**. Nothing is uploaded
anywhere; there is no account and no cloud.

That is deliberate — it works with no internet, costs nothing, and guest ID
data never leaves the premises. The trade-off is real:

- **The data is only on that device.** If the tablet is lost, wiped, or the
  browser's site data is cleared, the data is gone.
- **Press Backup weekly.** It downloads a JSON file. Keep copies somewhere
  else — Google Drive, a pen drive, anywhere but that one device.
- **Restore** reads a backup file back in.
- Two devices do not sync. Use one device as the record of truth.

If the lodge outgrows this, the upgrade path is a small hosted database — but
do not start there. Run this for six months first and find out what is
actually needed.

---

## Guest register and the law

The register tab exists because lodges in Andhra Pradesh are required to
record every guest's name, address and photo ID, and to produce that register
on demand. Export CSV gives you a copy to hand over or print.

This is a tool for keeping the record, not legal advice. Confirm your actual
obligations — register format, police reporting, GST slab for your tariff
band, trade licence, fire safety clearance — with a local CA or consultant
before opening.

---

## Tests

`test/smoke-test.js` drives both pages in a real browser and checks 52 things:
that every section renders from `config.js`, that the booking estimate
arithmetic is right, that the page does not scroll sideways on a phone, that
the Telugu toggle works, that no map coordinates are published while
unverified, and a full check-in → reload → check-out → CSV export cycle on the
reception desk.

```bash
npm i -D playwright && npx playwright install chromium
npx http-server . -p 8899 &
node test/smoke-test.js
```

Run it after changing `config.js`. A typo in that file is the most likely way
to break the site, and this catches it in about fifteen seconds.
