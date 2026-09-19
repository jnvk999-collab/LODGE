/* ===========================================================
   main.js — renders the whole page from config.js
   No framework. Everything below reads LODGE and writes DOM.
   =========================================================== */
(function () {
  'use strict';

  var C = window.LODGE || LODGE;

  /* ---------- bilingual strings ----------
     Telugu matters here: a good share of walk-in and phone
     enquiries in Kadapa will be more comfortable reading it. */
  var T = {
    en: {
      cityLine: C.address.city + ', ' + C.address.state,
      heroEyebrow: 'Lodge in ' + (C.address.locality || C.address.line2) + ' · ' + C.address.city,
      heroTitle: flatRate()
        ? 'A clean AC room in ' + esc(C.address.city) + ', ' + amt() + ' a night'
        : 'A clean room in ' + esc(C.address.city) + ', from ' + amt() + ' a night',
      tagline: C.tagline,
      ctaWhatsApp: 'Book on WhatsApp',
      ctaCall: 'Call now',
      directNote: C.directDiscount > 0
        ? 'Booking direct is about ' + C.directDiscount + '% cheaper than travel websites. Reception answers 24 hours.'
        : 'Same rate every day of the year — no weekend or festival surcharge. Reception answers 24 hours.',
      h2Rooms: 'Rooms and tariff',
      pRooms: 'One rate per room, per night, taxes included. No hidden charges at checkout.',
      h3LongStay: 'Staying a week or a month?',
      pLongStay: 'If you are attending to a patient at a hospital, posted here on work, or on a long site assignment — ask for these rates. They are much cheaper than the nightly tariff.',
      h2Amenities: 'What you get in every room',
      pAmenities: 'The things budget travellers actually care about, not a long list of features nobody uses.',
      h2Location: 'How far is it from where you are going?',
      pLocation: 'We are in the middle of town, walking distance from the railway station.',
      thPlace: 'Place', thDist: 'Distance', thTime: 'By auto',
      ctaDirections: 'Open in Google Maps',
      h2Offers: 'Special rates',
      pOffers: 'Tell us why you are travelling and we will give you the right rate.',
      h2Gallery: 'Photos',
      pGallery: 'Taken at the lodge. What you see is what you get.',
      h2Reviews: 'What guests say',
      pReviews: 'Reviews from guests who stayed with us.',
      reviewAsk: 'Stayed with us recently? A Google review takes 30 seconds and helps the next traveller find a clean room.',
      ctaReview: 'Write a Google review',
      h2Book: 'Book a room',
      pBook: 'Fill this in and it opens WhatsApp with your details already typed. Or just call — that works too.',
      lblName: 'Your name', lblPhone: 'Mobile number',
      lblIn: 'Check-in date', lblOut: 'Check-out date',
      lblRoom: 'Room type', lblQty: 'How many rooms',
      lblNote: 'Anything we should know? (arrival time, patient at hospital, exam date, food needs)',
      ctaSend: 'Send on WhatsApp',
      bkHint: 'Nothing is charged online. We confirm on WhatsApp or by phone.',
      h3Reach: 'Reach us directly',
      lblCall24: 'Reception · 24 hours', lblAlt: 'Alternate number', lblEmail: 'Email',
      h3Upi: 'Advance payment', pUpi: 'For confirmed bookings on busy dates, pay one night in advance to this UPI ID:',
      h3Policy: 'Good to know',
      ftrReg: 'Open 24 hours · ' + C.totalRooms + ' rooms · GST invoice available on request',
      demoNote: 'DEMO SITE — this is a working sample built with placeholder details. Business name, phone numbers, prices, photos and reviews are examples only and must be replaced with real information before this goes live.',
      night: 'per night', perRoom: 'per room',
      photoSoon: 'Photographs are being taken',
      photoSoonSub: 'The lodge is still being finished. Real photographs of the rooms, bathroom and entrance go here before opening.',
      oneRate: 'One rate, every room, every night',
      estFor: 'Estimated total', estNights: 'night', estNightsP: 'nights',
      estRooms: 'room', estRoomsP: 'rooms', estOnArrival: 'Payable at the lodge. Confirm on WhatsApp.'
    },
    te: {
      cityLine: 'కడప, ఆంధ్రప్రదేశ్',
      heroEyebrow: 'చిన్న చౌకు, కడప · లాడ్జి',
      heroTitle: flatRate()
        ? 'కడపలో శుభ్రమైన ఏసీ గది, రాత్రికి ' + amt()
        : 'కడపలో శుభ్రమైన గది, రాత్రికి ' + amt() + ' నుండి',
      tagline: C.taglineTe,
      ctaWhatsApp: 'వాట్సాప్‌లో బుక్ చేయండి',
      ctaCall: 'ఫోన్ చేయండి',
      directNote: C.directDiscount > 0
        ? 'నేరుగా బుక్ చేస్తే ట్రావెల్ వెబ్‌సైట్‌ల కన్నా సుమారు ' + C.directDiscount + '% తక్కువ. రిసెప్షన్ 24 గంటలు.'
        : 'సంవత్సరం పొడవునా ఒకే ధర — వారాంతపు లేదా పండుగ అదనపు ఛార్జీలు లేవు. రిసెప్షన్ 24 గంటలు.',
      h2Rooms: 'గదులు మరియు ధరలు',
      pRooms: 'ఒక గదికి, ఒక రాత్రికి ఒకే ధర, పన్నులతో కలిపి. చెక్అవుట్ సమయంలో అదనపు ఛార్జీలు లేవు.',
      h3LongStay: 'వారం లేదా నెల ఉండాలా?',
      pLongStay: 'ఆసుపత్రిలో రోగి దగ్గర ఉంటున్నా, ఉద్యోగ రీత్యా వచ్చినా, సైట్ పనిపై ఎక్కువ రోజులు ఉండాల్సి వచ్చినా — ఈ రేట్లు అడగండి. రోజువారీ ధర కన్నా చాలా తక్కువ.',
      h2Amenities: 'ప్రతి గదిలో లభించేవి',
      pAmenities: 'ప్రయాణికులకు నిజంగా అవసరమైనవి మాత్రమే.',
      h2Location: 'మీరు వెళ్ళే చోటుకి ఎంత దూరం?',
      pLocation: 'మేము టౌన్ మధ్యలో, రైల్వే స్టేషన్ నడక దూరంలో ఉన్నాం.',
      thPlace: 'ప్రదేశం', thDist: 'దూరం', thTime: 'ఆటోలో',
      ctaDirections: 'గూగుల్ మ్యాప్స్‌లో చూడండి',
      h2Offers: 'ప్రత్యేక ధరలు',
      pOffers: 'మీరు ఎందుకు ప్రయాణిస్తున్నారో చెప్పండి, తగిన రేటు ఇస్తాం.',
      h2Gallery: 'ఫోటోలు',
      pGallery: 'లాడ్జిలో తీసిన ఫోటోలు. చూసినదే మీకు లభిస్తుంది.',
      h2Reviews: 'అతిథుల అభిప్రాయాలు',
      pReviews: 'మా వద్ద బస చేసిన అతిథుల సమీక్షలు.',
      reviewAsk: 'ఇటీవల మా వద్ద బస చేశారా? గూగుల్ రివ్యూ రాయడానికి 30 సెకన్లు చాలు.',
      ctaReview: 'గూగుల్ రివ్యూ రాయండి',
      h2Book: 'గది బుక్ చేయండి',
      pBook: 'ఇది నింపితే మీ వివరాలతో వాట్సాప్ తెరుచుకుంటుంది. లేదా నేరుగా ఫోన్ చేయండి.',
      lblName: 'మీ పేరు', lblPhone: 'మొబైల్ నంబర్',
      lblIn: 'చెక్-ఇన్ తేదీ', lblOut: 'చెక్-అవుట్ తేదీ',
      lblRoom: 'గది రకం', lblQty: 'ఎన్ని గదులు',
      lblNote: 'మేము తెలుసుకోవలసినది ఏమైనా? (వచ్చే సమయం, ఆసుపత్రి, పరీక్ష తేదీ, భోజనం)',
      ctaSend: 'వాట్సాప్‌లో పంపండి',
      bkHint: 'ఆన్‌లైన్‌లో ఎటువంటి చెల్లింపు లేదు. వాట్సాప్ లేదా ఫోన్ ద్వారా ధృవీకరిస్తాం.',
      h3Reach: 'నేరుగా సంప్రదించండి',
      lblCall24: 'రిసెప్షన్ · 24 గంటలు', lblAlt: 'ప్రత్యామ్నాయ నంబర్', lblEmail: 'ఇమెయిల్',
      h3Upi: 'అడ్వాన్స్ చెల్లింపు', pUpi: 'రద్దీ తేదీలలో బుకింగ్ ఖాయం చేయడానికి ఒక రాత్రి అడ్వాన్స్ ఈ UPI ఐడీకి చెల్లించండి:',
      h3Policy: 'గమనించవలసినవి',
      ftrReg: '24 గంటలు తెరిచి ఉంటుంది · ' + C.totalRooms + ' గదులు · అడిగితే GST బిల్లు ఇవ్వబడును',
      demoNote: 'DEMO SITE — ఇది నమూనా వివరాలతో తయారు చేసిన శాంపిల్ వెబ్‌సైట్. పేరు, ఫోన్ నంబర్లు, ధరలు, ఫోటోలు, రివ్యూలు అన్నీ ఉదాహరణలు మాత్రమే. లైవ్‌కి వెళ్ళే ముందు అసలు వివరాలతో మార్చాలి.',
      night: 'ఒక రాత్రికి', perRoom: 'ఒక గదికి',
      photoSoon: 'ఫోటోలు తీయడం జరుగుతోంది',
      photoSoonSub: 'లాడ్జి పనులు ఇంకా పూర్తి కావలసి ఉంది. గదులు, బాత్రూమ్, ప్రవేశ ద్వారం అసలు ఫోటోలు ప్రారంభానికి ముందు ఇక్కడ వస్తాయి.',
      oneRate: 'అన్ని గదులకు, అన్ని రోజులకు ఒకే ధర',
      estFor: 'అంచనా మొత్తం', estNights: 'రాత్రి', estNightsP: 'రాత్రులు',
      estRooms: 'గది', estRoomsP: 'గదులు', estOnArrival: 'లాడ్జిలో చెల్లించాలి. వాట్సాప్‌లో ధృవీకరించండి.'
    }
  };

  var lang = 'en';
  function t(k) { return T[lang][k] != null ? T[lang][k] : T.en[k]; }
  function minPrice() { return Math.min.apply(null, C.rooms.map(function (r) { return r.price; })); }
  function inr0(n) { return Number(n).toLocaleString('en-IN'); }
  // the nightly figure, marked up so the stylesheet can set it in gold
  function amt() { return '<span class="amt">\u20B9' + inr0(minPrice()) + '</span>'; }
  // one room category, or several that all cost the same
  function flatRate() { return C.rooms.length === 1 || minPrice() === Math.max.apply(null, C.rooms.map(function (r) { return r.price; })); }
  function hasPhotos() { return C.photosReady === true; }
  function inr(n) { return '₹' + Number(n).toLocaleString('en-IN'); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* wa.me link with a message already typed in. This is the
     single most-used button on a tier-3 lodge site. */
  function wa(msg) {
    return 'https://wa.me/' + C.whatsapp + (msg ? '?text=' + encodeURIComponent(msg) : '');
  }

  var HREFS = {
    tel:     function () { return 'tel:' + C.phone; },
    tel2:    function () { return 'tel:' + C.phone2; },
    mail:    function () { return 'mailto:' + C.email; },
    maps:    function () { return C.mapsLink; },
    review:  function () { return C.reviewLink; },
    waPlain: function () { return wa(''); },
    waBook:  function () {
      return wa('Hello ' + C.name + ', I would like to book a room. Please tell me the availability and tariff.');
    }
  };

  /* ---------- amenity icons (emoji keeps it zero-weight) ---------- */
  var ICONS = {
    'hot-water': '♨', 'clock': '⏰', 'breakfast': '☕', 'wifi': '📶',
    'parking': '🚗', 'power': '🔋', 'cctv': '📷', 'lift': '🛂',
    'luggage': '🧳', 'room-service': '🔔', 'laundry': '👕', 'doctor': '🩺'
  };

  /* =========================================================
     RENDER
     ========================================================= */
  function render() {
    document.documentElement.lang = lang;
    document.body.classList.toggle('te', lang === 'te');

    /* simple text bindings */
    var vals = {
      name: lang === 'te' ? C.nameTe : C.name,
      cityLine: t('cityLine'),
      heroEyebrow: t('heroEyebrow'),
      heroTitle: t('heroTitle'),
      tagline: t('tagline'),
      ctaWhatsApp: t('ctaWhatsApp'),
      ctaCall: t('ctaCall'),
      directNote: t('directNote'),
      phone1: C.phoneDisplay,
      phone2: C.phone2.replace(/^(\+91)(\d{5})(\d{5})$/, '$1 $2 $3'),
      email: C.email
    };
    ['h2Rooms','pRooms','h3LongStay','pLongStay','h2Amenities','pAmenities','h2Location','pLocation',
     'thPlace','thDist','thTime','ctaDirections','h2Offers','pOffers','h2Gallery','pGallery',
     'h2Reviews','pReviews','reviewAsk','ctaReview','h2Book','pBook','lblName','lblPhone','lblIn',
     'lblOut','lblRoom','lblQty','lblNote','ctaSend','bkHint','h3Reach','lblCall24','lblAlt',
     'lblEmail','h3Upi','pUpi','h3Policy','ftrReg','demoNote'
    ].forEach(function (k) { vals[k] = t(k); });

    $$('[data-bind]').forEach(function (el) {
      var v = vals[el.getAttribute('data-bind')];
      if (v != null) el.textContent = v;
    });
    // only for values this file builds as markup; never user input
    $$('[data-bind-html]').forEach(function (el) {
      var v = vals[el.getAttribute('data-bind-html')];
      if (v != null) el.innerHTML = v;
    });
    $$('[data-bind-href]').forEach(function (el) {
      var f = HREFS[el.getAttribute('data-bind-href')];
      if (f) el.setAttribute('href', f());
    });

    $('#langBtn').textContent = lang === 'en' ? 'తెలుగు' : 'English';
    document.title = (lang === 'te' ? C.nameTe : C.name) + ' — ' +
      (lang === 'te' ? 'కడపలో లాడ్జి' : 'Lodge in ' + C.address.city);
    $('.brand-mark').textContent = C.name.split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();

    var heroImg = $('.hero-bg img');
    if (heroImg) heroImg.hidden = !hasPhotos();

    renderHeroPills();
    renderTrust();
    renderRooms();
    renderLongStay();
    renderAmenities();
    renderDistances();
    renderOffers();
    renderGallery();
    renderReviews();
    renderAddresses();
    renderPolicies();
    renderBookingForm();
  }

  function renderHeroPills() {
    var picks = C.amenities.slice(0, 5);
    $('#heroPills').innerHTML = picks.map(function (a) {
      return '<li>' + (ICONS[a.icon] || '✓') + ' ' + esc(lang === 'te' ? a.te : a.label) + '</li>';
    }).join('');
  }

  function renderTrust() {
    var items = lang === 'te'
      ? [[C.totalRooms, 'గదులు'], [inr(minPrice()), 'నుండి / రాత్రి'], [C.ratingValue + ' ★', C.ratingCount + ' రివ్యూలు'], ['24', 'గంటల చెక్అవుట్']]
      : [[C.totalRooms, 'Rooms'], [inr(minPrice()), 'From / night'], [C.ratingValue + ' ★', C.ratingCount + ' reviews'], ['24 hr', 'Checkout']];
    $('#trustIn').innerHTML = items.map(function (i) {
      return '<div class="tr-item"><b>' + esc(i[0]) + '</b><span>' + esc(i[1]) + '</span></div>';
    }).join('');
  }

  function renderRooms() {
    $('#roomsGrid').className = 'rooms' + (C.rooms.length === 1 ? ' is-single' : '');
    $('#roomsGrid').innerHTML = C.rooms.map(function (r) {
      var msg = 'Hello ' + C.name + ', I want to book the ' + r.name + ' (' + inr(r.price) + ' per night). Is it available?';
      return '' +
      '<article class="room' + (r.popular ? ' is-popular' : '') + '">' +
        (r.popular ? '<span class="room-tag">' + (lang === 'te' ? 'ఎక్కువ బుకింగ్' : 'Most booked') + '</span>' : '') +
        (hasPhotos()
          ? '<div class="room-img"><img src="' + esc(r.img) + '" alt="' + esc(r.name) + '" loading="lazy" width="800" height="600"></div>'
          : '<div class="room-img photo-pending"><span class="pp-ic" aria-hidden="true">\uD83D\uDCF7</span>' +
            '<strong>' + esc(t('photoSoon')) + '</strong>' +
            '<span class="pp-sub">' + esc(t('photoSoonSub')) + '</span></div>') +
        '<div class="room-bd">' +
          '<h3 class="room-nm">' + esc(lang === 'te' && r.nameTe ? r.nameTe : r.name) + '</h3>' +
          '<div class="room-meta"><span>👤 ' + esc(r.occupancy) + '</span><span>🛏 ' + esc(r.beds) + '</span></div>' +
          '<ul class="room-ft">' + r.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
          (r.note ? '<p class="room-note">' + esc(r.note) + '</p>' : '') +
          '<div class="room-ftr">' +
            '<div class="room-pr"><b>' + inr(r.price) + '</b><span>' + esc(t('night')) + '</span></div>' +
            '<a class="btn btn-wa" href="' + esc(wa(msg)) + '">' + esc(lang === 'te' ? 'బుక్ చేయండి' : 'Book this') + '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function renderLongStay() {
    var box = document.getElementById('longstay');
    if (box) box.hidden = !C.longStay.length;
    if (!C.longStay.length) { $('#lsGrid').innerHTML = ''; return; }
    $('#lsGrid').innerHTML = C.longStay.map(function (l) {
      return '<div class="ls"><b>' + inr(l.price) + '</b><strong>' + esc(l.label) + '</strong><span>' + esc(l.for) + '</span></div>';
    }).join('');
  }

  function renderAmenities() {
    $('#amenGrid').innerHTML = C.amenities.map(function (a) {
      return '<li><span class="ic" aria-hidden="true">' + (ICONS[a.icon] || '✓') + '</span>' +
             esc(lang === 'te' ? a.te : a.label) + '</li>';
    }).join('');
  }

  function renderDistances() {
    $('#distBody').innerHTML = C.distances.map(function (d) {
      var approx = d.verified === false ? '~' : '';
      var km = approx + (d.km < 1 ? (d.km * 1000) + ' m' : d.km + ' km');
      var mins = approx + (d.mins >= 60 ? Math.round(d.mins / 60 * 10) / 10 + (lang === 'te' ? ' గం' : ' hr') : d.mins + (lang === 'te' ? ' ని' : ' min'));
      return '<tr><td>' + esc(lang === 'te' && d.placeTe ? d.placeTe : d.place) + '</td><td>' + esc(km) + '</td><td>' + esc(mins) + '</td></tr>';
    }).join('');
    // the map frame is optional: some embeds of this page omit it
    var mapFrame = $('#mapFrame');
    if (mapFrame) mapFrame.src = C.mapsEmbed;
  }

  function renderOffers() {
    $('#offersGrid').innerHTML = C.offers.map(function (o) {
      var msg = 'Hello ' + C.name + ', I am asking about: ' + o.title + '. Please share the rate and availability.';
      return '<article class="offer">' +
        '<h3>' + esc(lang === 'te' && o.titleTe ? o.titleTe : o.title) + '</h3>' +
        '<p>' + esc(o.body) + '</p>' +
        '<a class="btn btn-ghost" href="' + esc(wa(msg)) + '">' + esc(o.cta) + '</a>' +
      '</article>';
    }).join('');
  }

  function renderGallery() {
    // No gallery of placeholder boxes. Until real photographs exist the
    // whole section is removed, which reads as deliberate rather than broken.
    var sec = document.getElementById('gallery');
    if (sec) sec.hidden = !hasPhotos() || !C.gallery.length;
    if (!hasPhotos()) { $('#galGrid').innerHTML = ''; return; }
    $('#galGrid').innerHTML = C.gallery.map(function (g) {
      return '<figure><img src="' + esc(g.img) + '" alt="' + esc(g.caption) + '" loading="lazy" width="800" height="600">' +
             '<figcaption>' + esc(g.caption) + '</figcaption></figure>';
    }).join('');
  }

  function renderReviews() {
    $('#revGrid').innerHTML = C.reviews.map(function (r) {
      return '<article class="rev">' +
        '<div class="rev-st" aria-label="' + r.stars + ' out of 5">' + '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars) + '</div>' +
        '<p class="rev-tx">' + esc(r.text) + '</p>' +
        '<p class="rev-by">' + esc(r.name) + ' <span>· ' + esc(r.source) + '</span></p>' +
      '</article>';
    }).join('');
  }

  function renderAddresses() {
    var a = C.address;
    var html = esc(a.line1) + '<br>' + esc(a.line2) + '<br>' +
               esc(a.city) + ', ' + esc(a.state) + ' ' + esc(a.pincode);
    $('#addrBlock').innerHTML = html;
    $('#ftrAddr').innerHTML = html + '<br>' + esc(C.phoneDisplay);
    $('#upiId').textContent = C.upi.id;
  }

  function renderPolicies() {
    $('#policyList').innerHTML = C.policies.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('');
  }

  /* =========================================================
     BOOKING FORM -> WhatsApp
     ========================================================= */
  function renderBookingForm() {
    var sel = $('#bkRoom');
    sel.innerHTML = C.rooms.map(function (r) {
      return '<option value="' + esc(r.id) + '">' + esc(lang === 'te' && r.nameTe ? r.nameTe : r.name) + ' — ' + inr(r.price) + '</option>';
    }).join('');
    var qty = $('#bkQty');
    if (!qty.options.length) {
      qty.innerHTML = [1, 2, 3, 4, 5, 6].map(function (n) { return '<option value="' + n + '">' + n + '</option>'; }).join('');
    }
    var today = new Date().toISOString().slice(0, 10);
    $('#bkIn').min = today;
    $('#bkOut').min = today;
  }

  function nights() {
    var i = $('#bkIn').value, o = $('#bkOut').value;
    if (!i || !o) return 1;
    var d = (new Date(o) - new Date(i)) / 86400000;
    return d > 0 ? Math.round(d) : 1;
  }

  function updateEstimate() {
    var room = C.rooms.filter(function (r) { return r.id === $('#bkRoom').value; })[0];
    var est = $('#est');
    if (!room) { est.classList.remove('on'); return; }
    var n = nights(), q = Number($('#bkQty').value) || 1, total = room.price * n * q;
    est.innerHTML = esc(t('estFor')) + ': <b>' + inr(total) + '</b><br>' +
      '<span style="font-weight:500">' + q + ' ' + esc(q > 1 ? t('estRoomsP') : t('estRooms')) +
      ' × ' + n + ' ' + esc(n > 1 ? t('estNightsP') : t('estNights')) +
      ' × ' + inr(room.price) + '<br>' + esc(t('estOnArrival')) + '</span>';
    est.classList.add('on');
  }

  function onSubmit(e) {
    e.preventDefault();
    var f = e.target;
    if (!f.name.value.trim() || !f.phone.value.trim()) {
      f.reportValidity && f.reportValidity();
      return;
    }
    var room = C.rooms.filter(function (r) { return r.id === f.room.value; })[0];
    var n = nights(), q = Number(f.qty.value) || 1;

    var lines = [
      'Booking enquiry — ' + C.name,
      '',
      'Name: ' + f.name.value.trim(),
      'Mobile: ' + f.phone.value.trim(),
      'Check-in: ' + (f.checkin.value || 'not decided'),
      'Check-out: ' + (f.checkout.value || 'not decided'),
      'Room: ' + (room ? room.name : '-') + ' × ' + q,
      'Nights: ' + n
    ];
    if (room) lines.push('Approx total: ' + inr(room.price * n * q));
    if (f.note.value.trim()) lines.push('', 'Note: ' + f.note.value.trim());
    lines.push('', 'Please confirm availability.');

    window.open(wa(lines.join('\n')), '_blank', 'noopener');
  }

  /* =========================================================
     STRUCTURED DATA for Google
     This is what makes the price, rating, phone number and map
     pin show up in search results. Worth more than the design.
     ========================================================= */
  function injectSchema() {
    var d = {
      '@context': 'https://schema.org',
      '@type': 'Hotel',
      name: C.name,
      description: C.tagline,
      url: location.href.split('#')[0],
      telephone: C.phone,
      email: C.email,
      priceRange: inr(minPrice()) + ' – ' + inr(Math.max.apply(null, C.rooms.map(function (r) { return r.price; }))),
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Card',
      numberOfRooms: C.totalRooms,
      checkinTime: '12:00',
      checkoutTime: '12:00',
      address: {
        '@type': 'PostalAddress',
        streetAddress: C.address.line1 + ', ' + C.address.line2,
        addressLocality: C.address.city,
        addressRegion: C.address.state,
        postalCode: C.address.pincode,
        addressCountry: C.address.country
      },
      hasMap: C.mapsLink,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '00:00', closes: '23:59'
      },
      amenityFeature: C.amenities.map(function (a) {
        return { '@type': 'LocationFeatureSpecification', name: a.label, value: true };
      }),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: C.ratingValue, reviewCount: C.ratingCount, bestRating: 5, worstRating: 1
      },
      makesOffer: C.rooms.map(function (r) {
        return {
          '@type': 'Offer',
          name: r.name,
          price: r.price,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          eligibleQuantity: { '@type': 'QuantitativeValue', unitText: 'night', value: 1 }
        };
      })
    };
    // Only publish coordinates once someone has actually stood at the
    // gate and read them off the phone. See config.js -> geo.verified.
    if (C.geo && C.geo.verified) {
      d.geo = { '@type': 'GeoCoordinates', latitude: C.geo.lat, longitude: C.geo.lng };
    }

    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(d);
    document.head.appendChild(s);
  }

  /* =========================================================
     BOOT
     ========================================================= */
  function init() {
    // remember the visitor's language choice
    try {
      var saved = localStorage.getItem('lodge.lang');
      if (saved === 'te' || saved === 'en') lang = saved;
    } catch (_) { /* private mode: fall back to English */ }

    render();
    injectSchema();

    $('#langBtn').addEventListener('click', function () {
      lang = lang === 'en' ? 'te' : 'en';
      try { localStorage.setItem('lodge.lang', lang); } catch (_) {}
      render();
      updateEstimate();
    });

    $('#bookForm').addEventListener('submit', onSubmit);
    ['#bkRoom', '#bkQty', '#bkIn', '#bkOut'].forEach(function (s) {
      $(s).addEventListener('change', function () {
        // keep checkout on or after check-in
        var i = $('#bkIn').value;
        if (i) $('#bkOut').min = i;
        updateEstimate();
      });
    });

    // smooth in-page nav without the hash jumping under the header
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var el = document.querySelector(a.getAttribute('href'));
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
