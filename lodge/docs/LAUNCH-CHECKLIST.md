# Krishna Grand — launch checklist

Work top to bottom. Nothing below the line matters until everything above it
is done.

---

## A. Fix the data that is currently a placeholder

Everything here is in `site/config.js`.

- [ ] **Business name** — confirm the exact spelling and the Telugu spelling
      (`name`, `nameTe`). Currently "Krishna Grand" / "కృష్ణా గ్రాండ్".
- [ ] **Phone numbers** — `phone`, `phone2`, `phoneDisplay`. Reception must
      answer the first one 24 hours.
- [ ] **WhatsApp number** — `whatsapp`, digits only, `91` prefix, no `+`.
- [ ] **Email** and **UPI ID** (`upi.id`) — from the business bank account.
- [ ] **Door number** — `address.line1` currently reads "Near Prasanna
      Associates, MDR379". Replace with the allotted door number once it
      exists; keep the landmark, people navigate by it.
- [ ] **Coordinates** (`geo`) — ⚠️ currently placeholders for central Kadapa,
      **not the plot**. The Maps link this project started from points at
      *Care dental*, ~50 m away. Stand at the gate, long-press in Google
      Maps, copy lat/long, paste, set `verified: true`.
- [ ] **Distances** — ⚠️ currently estimates. Measure each one in Google Maps
      Directions (by car), enter the real km and minutes, set `verified:
      true`. Until then they display with a `~` so the site does not promise
      a number nobody checked.
- [ ] **Room types and prices** — match what is actually being built. Room
      count per type is set in `pms/js/pms.js` → `buildRooms()`.
- [ ] **Long-stay rates** — the weekly and monthly numbers. Decide these
      before opening; they are how you win hospital and contractor business.
- [ ] **Amenities** — delete anything you will not actually provide. A lift
      that does not work costs you a one-star review.
- [ ] **Policies** — confirm the ID rule, the couples rule, extra bed charge,
      cancellation window.
- [ ] **Reviews** — ⚠️ the three in the file are samples. **Delete them.**
      Add real Google reviews only once you have them.
- [ ] **`reviewLink`** — paste the "write a review" short link from your
      Google Business Profile once it exists.

---

## B. Photographs

Street View screenshots cannot be used — Google watermark, phone UI, and they
show neighbouring businesses.

Take these with a phone, in **bright daylight, landscape, 1600×1200 or
larger**. Save as `.jpg` into `site/img/` using the **same filenames** as the
existing placeholders and nothing else needs changing.

| Filename | Shot |
|---|---|
| `hero.jpg` | Building front, whole facade, from across the street |
| `gallery-exterior.jpg` | Entrance and gate, clean, nothing parked in front |
| `gallery-reception.jpg` | Reception desk, lights on, staff member present |
| `gallery-bathroom.jpg` | **The most important photo on the site.** Clean, dry, well lit, geyser visible |
| `gallery-breakfast.jpg` | Breakfast laid out, idli/dosa, on a clean table |
| `gallery-parking.jpg` | Parking area with a vehicle in it, showing the gate |
| `gallery-corridor.jpg` | Corridor and lift, lights on |
| `room-nonac-single.jpg` | Bed made, curtains open, from the doorway corner |
| `room-nonac-double.jpg` | Same framing |
| `room-ac-double.jpg` | Same framing, AC unit in frame |
| `room-ac-triple.jpg` | Same framing, all beds visible |
| `room-family-suite.jpg` | Wide shot showing both rooms |

Rules that matter more than the camera:
- Bed made, taut. No bedsheet creases, no personal items.
- Curtains open, lights on, shoot in the morning.
- Shoot from a corner at chest height — it makes rooms look their real size.
- No people in room shots. One staff member in the reception shot is good.
- Take 5 of each and pick the best one.

Upload the same photos to the Google Business Profile.

---

## C. Google Business Profile

- [ ] Create it **standing at the lodge gate** so the pin is correct
- [ ] Category: *Lodging*; secondary: *Budget hotel*
- [ ] Hours: open 24 hours
- [ ] Phone, WhatsApp, website link all filled
- [ ] 20+ photos uploaded
- [ ] Messaging turned on — and answered
- [ ] Review QR card printed for the reception desk
- [ ] Verification postcard/call completed

---

## D. WhatsApp Business

- [ ] WhatsApp **Business** app installed (not regular WhatsApp)
- [ ] Catalogue: one entry per room type, photo + price
- [ ] Greeting message with tariff and directions
- [ ] Saved replies for the five most common questions
- [ ] Business hours set to 24 hours
- [ ] UPI QR saved and ready to send

---

## E. Put the website online

- [ ] Test on a real phone over mobile data, not just WiFi
- [ ] Every price on the page matches the board at reception
- [ ] Call button dials correctly
- [ ] WhatsApp button opens with the message pre-filled
- [ ] Map shows the right building
- [ ] Telugu toggle reads correctly — have someone else check it
- [ ] Deploy (GitHub Pages / Netlify / Cloudflare Pages — all free)
- [ ] Add the link to the Google Business Profile

---

## F. Reception desk system

- [ ] Decide the device: one tablet or laptop at reception, and only one
- [ ] Room numbers and types in `buildRooms()` match the real building
- [ ] Staff trained on: check-in, check-out, mark cleaning
- [ ] **Staff understand "Booking came from" is not optional** — that field
      is the only way you will learn which marketing works
- [ ] **Backup drill done**: press Backup, confirm the file downloads, copy
      it to Google Drive. Weekly, on a fixed day.
- [ ] Restore tested once, so you know it works before you need it
- [ ] Register CSV export tested and printed once

---

## G. Before opening day

- [ ] GST registration and correct slab confirmed with a CA
- [ ] Trade licence
- [ ] Fire safety clearance
- [ ] Guest register / police reporting requirement confirmed locally
- [ ] Signage permission
- [ ] Rate board at reception, in Telugu and English
- [ ] Exam calendar and dargah calendar on the reception wall
- [ ] 500 cards printed for the commission network

---

## H. Week one

- [ ] Walk the auto and taxi stands personally
- [ ] Cards to hospital front desks
- [ ] Cards to function halls and travel agents
- [ ] Ask every departing guest for a Google review
- [ ] Read the Reports tab on Sunday. Every Sunday.
