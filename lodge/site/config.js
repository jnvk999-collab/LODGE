/* ============================================================
   LODGE CONFIG — the ONLY file you edit to make this site real.
   Every price, phone number, photo and line of text comes from
   here. Change a value, reload the page, it is live.

   NOTE: the values below are SAMPLE data for a demo lodge.
   Replace them with the real ones before going live.
   ============================================================ */

const LODGE = {

  /* ---------- 1. IDENTITY ---------- */
  name:        "Krishna Grand",
  nameTe:      "కృష్ణా గ్రాండ్",
  tagline:     "One room type, one price. AC room at \u20B91,199 a night, with a full 24-hour checkout.",
  taglineTe:   "ఒకే రకం గది, ఒకే ధర. ఏసీ గది \u20B91,199, పూర్తి 24 గంటల చెక్అవుట్.",
  established: 2026,
  totalRooms:  16,

  /* Set this to true once real photographs are in site/img/.
     While it is false the site hides the gallery and shows a
     clean "photograph coming" panel instead of fake placeholder
     images, so an unfinished lodge looks deliberate rather than
     broken. See docs/LAUNCH-CHECKLIST.md for the shot list.    */
  photosReady: false,

  /* ---------- 2. CONTACT ----------
     phone: what the "Call" button dials. Keep the +91.
     whatsapp: digits only, no +, no spaces. This is what
     builds the wa.me/ link.                                   */
  phone:        "+919999900000",
  phoneDisplay: "+91 99999 00000",
  phone2:       "+919999900001",
  whatsapp:     "919999900000",
  email:        "stay@krishnagrand.example",

  /* ---------- 3. ADDRESS ----------
     The lodge under construction is the blue building that also
     houses the advocate's office (Prasanna Associates), on the
     corner at Chinna Chauku.

     IMPORTANT: the Google Maps link we started from points at
     the "Care dental" listing, which is about 50 m away from
     the actual building. Do NOT reuse that pin. Create a fresh
     Google Business Profile pin standing at the lodge gate.     */
  address: {
    line1:   "Near Prasanna Associates, MDR379",  // <-- add the door number once allotted
    locality:"Y.S. Nagar, Chinna Chauku",
    line2:   "Y.S. Nagar, Chinna Chauku",
    city:    "Kadapa",
    district:"YSR Kadapa",
    state:   "Andhra Pradesh",
    pincode: "516001",
    country: "IN"
  },

  /* !!! NOT YET VERIFIED !!!
     Placeholder coordinates for central Kadapa, NOT the plot.
     The nearby Care dental pin is ~50 m off, so it is not a
     substitute. A wrong pin sends guests to the wrong gate.
     To fix it in 30 seconds:
       1. Stand at the lodge gate with Google Maps open.
       2. Long-press that exact spot; the lat,long appears on top.
       3. Paste both numbers here and set verified to true.      */
  geo: { lat: 14.4673, lng: 78.8242, verified: false },

  /* Address-based links, safe to use before coordinates exist. */
  mapsLink:  "https://www.google.com/maps/search/?api=1&query=Y.S.Nagar%2C+Chinna+Chauku%2C+Kadapa%2C+Andhra+Pradesh+516001",
  mapsEmbed: "https://maps.google.com/maps?q=Y.S.Nagar%2C%20Chinna%20Chauku%2C%20Kadapa%2C%20Andhra%20Pradesh%20516001&z=16&output=embed",

  /* ---------- 4. UPI (for advance payment) ---------- */
  upi: { id: "krishnagrand@upi", name: "Krishna Grand" },

  /* ---------- 5. ROOMS & TARIFF ----------
     Krishna Grand runs ONE room category at ONE price. That is
     a genuine selling point in a town where every lodge haggles,
     so the site says so plainly instead of hiding it.

     CONFIRM: occupancy and bed configuration below are assumed.
     Correct them before launch.                                */
  rooms: [
    {
      id: "standard",
      name: "AC Room",
      nameTe: "ఏసీ గది",
      price: 1199,
      occupancy: "Up to 2 guests",   // <-- CONFIRM
      beds: "1 double bed",          // <-- CONFIRM
      img: "img/room-standard.svg",
      features: ["Air conditioned", "Attached bathroom", "24hr hot water", "LED TV", "Free WiFi"],
      note: "All 16 rooms are identical. No room-grade upselling, no rate haggling \u2014 the price on this page is the price at the desk."
    }
  ],

  /* ---------- 6. LONG-STAY RATES ----------
     EMPTY ON PURPOSE: pricing is currently flat at \u20B91,199, so
     the long-stay panel is hidden.

     Worth reconsidering before opening. Hospital attendants at
     RIMS and site engineers stay 1-4 weeks and choose on weekly
     and monthly rates, and almost no lodge in Kadapa advertises
     one. To switch the panel back on, add entries here, e.g.:

       { label: "Per week",  price: 7000, for: "Hospital attendants" },
       { label: "Per month", price: 24000, for: "Site engineers, corporate" }

     Anything in this list appears on the site automatically.    */
  longStay: [],

  /* ---------- 7. AMENITIES ----------
     Order matters. Put the things budget guests actually
     complain about in reviews at the top.                     */
  amenities: [
    { icon: "hot-water", label: "24hr hot water",    te: "24 గంటలు వేడి నీరు" },
    { icon: "clock",     label: "24-hour checkout",  te: "24 గంటల చెక్అవుట్" },
    { icon: "coffee",    label: "Free coffee \u00B7 2 per guest", te: "ఉచిత కాఫీ \u00B7 ఒక్కరికి 2" },
    { icon: "wifi",      label: "Free WiFi",         te: "ఉచిత వైఫై" },
    { icon: "parking",   label: "Free parking",      te: "ఉచిత పార్కింగ్" },
    { icon: "power",     label: "Power backup",      te: "పవర్ బ్యాకప్" },
    { icon: "cctv",      label: "CCTV security",     te: "సీసీటీవీ భద్రత" },
    { icon: "lift",      label: "Lift",              te: "లిఫ్ట్" },
    { icon: "luggage",   label: "Luggage room",      te: "లగేజ్ రూమ్" },
    { icon: "room-service", label: "Room service",   te: "రూమ్ సర్వీస్" },
    { icon: "laundry",   label: "Laundry",           te: "లాండ్రీ" },
    { icon: "doctor",    label: "Doctor on call",    te: "డాక్టర్ ఆన్ కాల్" }
  ],

  /* ---------- 8. DISTANCES ----------
     In a tier-3 town people choose a lodge by what it is NEAR,
     not by what it looks like. This block does more work than
     the photo gallery. Measure these honestly.                */
  distances: [
    /* !!! EVERY NUMBER BELOW IS AN ESTIMATE, NOT A MEASUREMENT !!!
       Chinna Chauku sits in the middle of town, so these are
       plausible, but publishing a wrong distance is the fastest
       way to get a one-star review from someone who booked
       believing the station was a 3-minute walk.

       Fix them properly: open Google Maps, Directions, from the
       lodge to each place, by car, and copy the real km and
       minutes. Then set verified:true. It takes ten minutes and
       it is the single most-read block on the whole site.      */
    { place: "Kadapa RTC Bus Stand",    placeTe: "కడప ఆర్టీసీ బస్ స్టాండ్", km: 2.0,  mins: 8,   verified: false },
    { place: "Kadapa Railway Station",  placeTe: "కడప రైల్వే స్టేషన్",     km: 3.0,  mins: 12,  verified: false },
    { place: "Ameen Peer Dargah",       placeTe: "అమీన్ పీర్ దర్గా",       km: 3.5,  mins: 13,  verified: false },
    { place: "District Collectorate",   placeTe: "జిల్లా కలెక్టరేట్",      km: 4.0,  mins: 15,  verified: false },
    { place: "RIMS Hospital",           placeTe: "రిమ్స్ ఆసుపత్రి",        km: 9.0,  mins: 22,  verified: false },
    { place: "Kadapa Airport",          placeTe: "కడప విమానాశ్రయం",        km: 15.0, mins: 30,  verified: false },
    { place: "Gandi Kshetram",          placeTe: "గండి క్షేత్రం",          km: 22.0, mins: 40,  verified: false },
    { place: "Tirupati",                placeTe: "తిరుపతి",                km: 130,  mins: 180, verified: false }
  ],

  /* ---------- 9. OFFERS ----------
     One offer per demand segment. These are the segments a
     Kadapa lodge can actually win.                            */
  offers: [
    {
      title: "Hospital attendant rate",
      titleTe: "ఆసుపత్రి సహాయకుల రేటు",
      body: "Staying with a patient at RIMS or a private hospital? Weekly and monthly rooms from ₹4,200/week. Free luggage storage, hot water any hour, and a flexible checkout so you can match hospital timings.",
      cta: "Ask for hospital rate"
    },
    {
      title: "Pilgrim & family stay",
      titleTe: "భక్తులు & కుటుంబాలు",
      body: "2 km from Ameen Peer Dargah and on the road to Tirupati. Early check-in for overnight trains, safe parking for your own vehicle, and complimentary coffee at the desk before an early darshan.",
      cta: "Book a pilgrim room"
    },
    {
      title: "Corporate & contractor monthly",
      titleTe: "కార్పొరేట్ & కాంట్రాక్టర్",
      body: "Monthly rooms for site engineers, auditors and government deputation staff. GST invoice provided, single monthly bill for multiple rooms, laundry included.",
      cta: "Get a corporate quote"
    },
    {
      title: "Exam-day block booking",
      titleTe: "పరీక్ష రోజు బుకింగ్",
      body: "APPSC, TET, bank and railway exam candidates — reserve early, we hold rooms for exam weekends. Wake-up call, coffee before you leave, and a drop to the exam centre arranged on request.",
      cta: "Reserve for exam day"
    }
  ],

  /* ---------- 10. GALLERY ---------- */
  gallery: [
    { img: "img/gallery-exterior.svg",  caption: "Front entrance" },
    { img: "img/gallery-reception.svg", caption: "Reception, open 24 hours" },
    { img: "img/gallery-bathroom.svg",  caption: "Attached bathroom, hot water 24hr" },
    { img: "img/gallery-coffee.svg",    caption: "Complimentary coffee" },
    { img: "img/gallery-parking.svg",   caption: "Parking" },
    { img: "img/gallery-corridor.svg",  caption: "Corridor and lift" }
  ],

  /* ---------- 11. REVIEWS ----------
     SAMPLE text. Never invent reviews on a live site: copy the
     real ones from your Google Business Profile, or delete
     this section until you have some.                         */
  reviews: [
    { name: "Ravi Kumar",    stars: 5, text: "Stayed 6 nights while my father was admitted at RIMS. They gave a weekly rate without me asking and kept hot water running late at night. Very helpful staff.", source: "Google" },
    { name: "S. Fathima",    stars: 5, text: "Close to the dargah, clean rooms, and the family room was big enough for all of us. Checkout time was flexible for our evening train.", source: "Google" },
    { name: "Naveen Reddy",  stars: 4, text: "Came for a site visit. WiFi actually worked, which is rare. Parking inside the compound is a big plus.", source: "MakeMyTrip" }
  ],
  ratingValue: 4.5,
  ratingCount: 128,

  /* ---------- 12. POLICIES ---------- */
  policies: [
    "Checkout is 24 hours from your check-in time — not a fixed 11 AM.",
    "Valid government photo ID required for every adult guest at check-in.",
    "Couples welcome with valid ID. Local IDs accepted.",
    "Children below 8 years stay free using existing bedding.",
    "Extra bed ₹300 per night.",
    "Complimentary coffee, two cups per guest. Outside food allowed in rooms.",
    "Free cancellation up to 6 hours before check-in on direct bookings."
  ],

  /* ---------- 13. SITE SETTINGS ---------- */
  ota: {
    // Leave a URL empty ("") to hide that badge.
    makemytrip: "",
    goibibo: "",
    booking: ""
  },
  /* Set above 0 to advertise a direct-booking discount against the
     OTAs. Held at 0 because pricing is currently flat at \u20B91,199. */
  directDiscount: 0
};

/* Expose on window. A top-level `const` in a classic script does NOT
   become a window property, and pms/index.html loads this file from a
   different folder, so it needs the explicit handle. */
window.LODGE = LODGE;
