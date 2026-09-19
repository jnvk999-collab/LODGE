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
  tagline:     "Clean rooms, hot water 24 hours, 24-hour checkout",
  taglineTe:   "శుభ్రమైన గదులు, 24 గంటలు వేడి నీరు, 24 గంటల చెక్అవుట్",
  established: 2026,
  totalRooms:  24,

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
     Prices are per room, per night, inclusive of taxes.
     Keep this list short — 4 to 6 types maximum. Guests get
     confused by long menus and confused guests do not book.   */
  rooms: [
    {
      id: "nonac-single",
      name: "Non-AC Single",
      nameTe: "నాన్-ఏసీ సింగిల్",
      price: 700,
      occupancy: "1 guest",
      beds: "1 single bed",
      img: "img/room-nonac-single.svg",
      features: ["Attached bathroom", "24hr hot water", "TV", "Free WiFi", "Desk"],
      note: "Best for solo travellers and one-night stays."
    },
    {
      id: "nonac-double",
      name: "Non-AC Double",
      nameTe: "నాన్-ఏసీ డబుల్",
      price: 900,
      occupancy: "2 guests",
      beds: "1 double bed",
      img: "img/room-nonac-double.svg",
      features: ["Attached bathroom", "24hr hot water", "TV", "Free WiFi", "Wardrobe"],
      note: "Our most-booked room."
    },
    {
      id: "ac-double",
      name: "AC Deluxe Double",
      nameTe: "ఏసీ డీలక్స్ డబుల్",
      price: 1400,
      occupancy: "2 guests",
      beds: "1 queen bed",
      img: "img/room-ac-double.svg",
      features: ["Air conditioned", "Attached bathroom", "24hr hot water", "LED TV", "Free WiFi", "Mini fridge"],
      popular: true,
      note: "Quietest rooms, away from the road."
    },
    {
      id: "ac-triple",
      name: "AC Triple",
      nameTe: "ఏసీ ట్రిపుల్",
      price: 1800,
      occupancy: "3 guests",
      beds: "1 double + 1 single",
      img: "img/room-ac-triple.svg",
      features: ["Air conditioned", "Attached bathroom", "24hr hot water", "LED TV", "Free WiFi", "Mini fridge"],
      note: "Popular with small families."
    },
    {
      id: "family-suite",
      name: "Family Suite",
      nameTe: "ఫ్యామిలీ సూట్",
      price: 2400,
      occupancy: "4-5 guests",
      beds: "2 double beds",
      img: "img/room-family-suite.svg",
      features: ["Air conditioned", "2 bathrooms", "24hr hot water", "LED TV", "Free WiFi", "Fridge", "Sitting area"],
      note: "Two connected rooms. Good for wedding guests."
    }
  ],

  /* ---------- 6. LONG-STAY RATES ----------
     This is the quietest money in a district-HQ town: hospital
     attendants and site engineers who stay for weeks. Almost
     no lodge advertises a monthly rate. You should.           */
  longStay: [
    { label: "Non-AC room, per month", price: 12000, for: "Hospital attendants, students" },
    { label: "AC room, per month",     price: 18000, for: "Site engineers, corporate" },
    { label: "Weekly (Non-AC)",        price: 4200,  for: "Extended medical stays" },
    { label: "Weekly (AC)",            price: 7500,  for: "Audits, project visits" }
  ],

  /* ---------- 7. AMENITIES ----------
     Order matters. Put the things budget guests actually
     complain about in reviews at the top.                     */
  amenities: [
    { icon: "hot-water", label: "24hr hot water",    te: "24 గంటలు వేడి నీరు" },
    { icon: "clock",     label: "24-hour checkout",  te: "24 గంటల చెక్అవుట్" },
    { icon: "breakfast", label: "Free breakfast",    te: "ఉచిత టిఫిన్" },
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
      body: "2 km from Ameen Peer Dargah and on the road to Tirupati. Early check-in for overnight trains, safe parking for your own vehicle, and pure-veg breakfast from 6 AM for early darshan.",
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
      body: "APPSC, TET, bank and railway exam candidates — reserve early, we hold rooms for exam weekends. Wake-up call, early breakfast, and drop to the exam centre arranged on request.",
      cta: "Reserve for exam day"
    }
  ],

  /* ---------- 10. GALLERY ---------- */
  gallery: [
    { img: "img/gallery-exterior.svg",  caption: "Front entrance" },
    { img: "img/gallery-reception.svg", caption: "Reception, open 24 hours" },
    { img: "img/gallery-bathroom.svg",  caption: "Attached bathroom, hot water 24hr" },
    { img: "img/gallery-breakfast.svg", caption: "Complimentary breakfast" },
    { img: "img/gallery-parking.svg",   caption: "Covered parking" },
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
    "Pure-vegetarian kitchen. Outside food allowed in rooms.",
    "Free cancellation up to 6 hours before check-in on direct bookings."
  ],

  /* ---------- 13. SITE SETTINGS ---------- */
  ota: {
    // Leave a URL empty ("") to hide that badge.
    makemytrip: "",
    goibibo: "",
    booking: ""
  },
  directDiscount: 10  // % cheaper than OTA, shown as the reason to call direct
};

/* Expose on window. A top-level `const` in a classic script does NOT
   become a window property, and pms/index.html loads this file from a
   different folder, so it needs the explicit handle. */
window.LODGE = LODGE;
