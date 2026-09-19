/* ===========================================================
   pms.js — reception desk system
   Runs entirely in the browser. Data lives in localStorage on
   THIS device, so: take the Backup file regularly. There is no
   server and nothing is sent anywhere.
   =========================================================== */
(function () {
  'use strict';

  var KEY = 'lodge.pms.v1';
  var C = window.LODGE;

  var SEGMENTS = [
    ['pilgrim',   'Pilgrim / darshan',        'యాత్రికులు'],
    ['medical',   'Hospital / patient care',  'ఆసుపత్రి'],
    ['govt',      'Government / official',    'ప్రభుత్వ పని'],
    ['corporate', 'Corporate / contractor',   'కార్పొరేట్'],
    ['exam',      'Exam candidate',           'పరీక్ష'],
    ['wedding',   'Wedding / function',       'పెళ్లి / ఫంక్షన్'],
    ['family',    'Tourist / family',         'కుటుంబం'],
    ['transit',   'Transit / walk-in',        'ప్రయాణం']
  ];

  var SOURCES = [
    'Walk-in', 'Phone call', 'WhatsApp', 'Google Maps', 'Website',
    'MakeMyTrip', 'Goibibo', 'Booking.com',
    'Auto / taxi driver', 'Hospital referral', 'Travel agent', 'Repeat guest'
  ];

  /* ---------- i18n ---------- */
  var I18N = {
    en: {
      tabBoard:'Room board', tabToday:'Today', tabRegister:'Guest register',
      tabGuests:'Guest database', tabReports:'Reports',
      backup:'Backup', restore:'Restore',
      lgVacant:'Vacant', lgOccupied:'Occupied', lgDue:'Due out', lgClean:'Cleaning', lgBlocked:'Blocked',
      occupied:'occupied', from:'From', to:'To', period:'Period', exportCsv:'Export CSV',
      hInHouse:'In-house guests', hDueOut:'Checking out today',
      hDaily:'Daily occupancy and revenue', hSeg:'Where your business comes from', hRoomPerf:'Revenue by room type',
      regHint:'This is your guest register. Keep it accurate — you are required to record every guest’s name, address and photo ID. Export a copy whenever the police or an inspection asks for it.',
      gHint:'Every guest who stays becomes a contact. Before Urs, exam weekends and festival dates, message the relevant segment on WhatsApp — repeat guests are the cheapest bookings you will ever get.',
      checkInTo:'Check in to room', room:'Room',
      fName:'Guest name', fPhone:'Mobile', fIdType:'ID type', fIdNo:'ID number',
      fAddr:'Address (town / district)', fSeg:'Why are they here?', fPax:'Number of guests',
      fNights:'Nights', fRate:'Rate per night (₹)', fAdvance:'Advance paid (₹)',
      fPay:'Payment mode', fSource:'Booking came from', fNote:'Note',
      cancel:'Cancel', doCheckIn:'Check in', doCheckOut:'Check out',
      markClean:'Mark cleaning', markReady:'Mark ready', block:'Block room', unblock:'Unblock',
      extend:'Add a night',
      // table headers
      thRoom:'Room', thGuest:'Guest', thPhone:'Phone', thSeg:'Purpose', thIn:'Check-in',
      thOut:'Check-out', thNights:'Nights', thRate:'Rate', thTotal:'Total', thBal:'Balance',
      thSource:'Source', thId:'ID', thAddr:'Address', thStays:'Stays', thLast:'Last stay',
      thType:'Type', thShare:'Share', thRev:'Revenue', thGuests:'Guests',
      thPax:'Pax', thPaid:'Paid', thAction:'',
      // KPIs
      kOcc:'Occupancy', kAdr:'ADR', kRevpar:'RevPAR', kRev:'Revenue today',
      kInHouse:'Guests in house', kArrivals:'Arrivals today', kDeps:'Departures today', kVacant:'Rooms vacant',
      kRevTotal:'Total revenue', kNights:'Room nights sold', kAvgStay:'Average stay',
      kTopSeg:'Biggest segment',
      // misc
      noneYet:'Nothing here yet', due:'Due out today', nights:'nights', night:'night',
      msgIn:'Checked in', msgOut:'Checked out', msgSaved:'Saved', msgBackup:'Backup downloaded',
      msgRestored:'Data restored', msgBadFile:'That file could not be read',
      confirmOut:'Check out this guest?', balanceDue:'Balance to collect',
      allSegments:'All purposes', seeded:'Sample data loaded so you can see how it works'
    },
    te: {
      tabBoard:'గదుల బోర్డు', tabToday:'ఈ రోజు', tabRegister:'అతిథుల రిజిస్టర్',
      tabGuests:'అతిథుల జాబితా', tabReports:'రిపోర్టులు',
      backup:'బ్యాకప్', restore:'రీస్టోర్',
      lgVacant:'ఖాళీ', lgOccupied:'నిండినవి', lgDue:'ఈ రోజు ఖాళీ', lgClean:'శుభ్రం చేయాలి', lgBlocked:'బ్లాక్',
      occupied:'నిండినవి', from:'నుండి', to:'వరకు', period:'కాలం', exportCsv:'CSV డౌన్‌లోడ్',
      hInHouse:'ప్రస్తుతం ఉన్న అతిథులు', hDueOut:'ఈ రోజు వెళ్ళేవారు',
      hDaily:'రోజువారీ ఆక్యుపెన్సీ & ఆదాయం', hSeg:'వ్యాపారం ఎక్కడి నుండి వస్తోంది', hRoomPerf:'గది రకం వారీగా ఆదాయం',
      regHint:'ఇది మీ అతిథుల రిజిస్టర్. ప్రతి అతిథి పేరు, చిరునామా, ఫోటో ఐడీ నమోదు చేయడం తప్పనిసరి. పోలీసులు లేదా తనిఖీ అడిగినప్పుడు కాపీ డౌన్‌లోడ్ చేయండి.',
      gHint:'బస చేసిన ప్రతి అతిథి ఒక కాంటాక్ట్. ఉర్స్, పరీక్షల వారాంతాలు, పండుగల ముందు వాట్సాప్‌లో సందేశం పంపండి — పాత అతిథులే అత్యంత చౌకైన బుకింగ్.',
      checkInTo:'గదిలో చెక్-ఇన్', room:'గది',
      fName:'అతిథి పేరు', fPhone:'మొబైల్', fIdType:'ఐడీ రకం', fIdNo:'ఐడీ నంబర్',
      fAddr:'చిరునామా (ఊరు / జిల్లా)', fSeg:'ఎందుకు వచ్చారు?', fPax:'ఎంతమంది',
      fNights:'రాత్రులు', fRate:'ఒక రాత్రి ధర (₹)', fAdvance:'అడ్వాన్స్ (₹)',
      fPay:'చెల్లింపు విధానం', fSource:'బుకింగ్ ఎక్కడి నుండి', fNote:'గమనిక',
      cancel:'రద్దు', doCheckIn:'చెక్-ఇన్', doCheckOut:'చెక్-అవుట్',
      markClean:'శుభ్రం చేయాలి', markReady:'సిద్ధం', block:'బ్లాక్ చేయి', unblock:'అన్‌బ్లాక్',
      extend:'మరో రాత్రి',
      thRoom:'గది', thGuest:'అతిథి', thPhone:'ఫోన్', thSeg:'కారణం', thIn:'చెక్-ఇన్',
      thOut:'చెక్-అవుట్', thNights:'రాత్రులు', thRate:'ధర', thTotal:'మొత్తం', thBal:'బ్యాలెన్స్',
      thSource:'మూలం', thId:'ఐడీ', thAddr:'చిరునామా', thStays:'బసలు', thLast:'చివరి బస',
      thType:'రకం', thShare:'వాటా', thRev:'ఆదాయం', thGuests:'అతిథులు',
      thPax:'మంది', thPaid:'చెల్లించారు', thAction:'',
      kOcc:'ఆక్యుపెన్సీ', kAdr:'సగటు ధర', kRevpar:'RevPAR', kRev:'ఈ రోజు ఆదాయం',
      kInHouse:'ఉన్న అతిథులు', kArrivals:'ఈ రోజు వచ్చినవి', kDeps:'ఈ రోజు వెళ్ళినవి', kVacant:'ఖాళీ గదులు',
      kRevTotal:'మొత్తం ఆదాయం', kNights:'అమ్మిన రూమ్ నైట్స్', kAvgStay:'సగటు బస',
      kTopSeg:'అతిపెద్ద విభాగం',
      noneYet:'ఇంకా ఏమీ లేదు', due:'ఈ రోజు వెళ్ళాలి', nights:'రాత్రులు', night:'రాత్రి',
      msgIn:'చెక్-ఇన్ అయ్యింది', msgOut:'చెక్-అవుట్ అయ్యింది', msgSaved:'సేవ్ అయ్యింది',
      msgBackup:'బ్యాకప్ డౌన్‌లోడ్ అయ్యింది', msgRestored:'డేటా రీస్టోర్ అయ్యింది',
      msgBadFile:'ఆ ఫైల్ చదవలేకపోయాం',
      confirmOut:'ఈ అతిథిని చెక్-అవుట్ చేయాలా?', balanceDue:'వసూలు చేయవలసినది',
      allSegments:'అన్ని కారణాలు', seeded:'ఎలా పనిచేస్తుందో చూడటానికి నమూనా డేటా లోడ్ అయ్యింది'
    }
  };

  var lang = 'en';
  function t(k) { return (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k; }
  function segLabel(id) {
    var s = SEGMENTS.filter(function (x) { return x[0] === id; })[0];
    return s ? (lang === 'te' ? s[2] : s[1]) : id;
  }

  /* ---------- tiny helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function inr(n) { return '₹' + Math.round(Number(n) || 0).toLocaleString('en-IN'); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function iso(d) { return new Date(d).toISOString().slice(0, 10); }
  function today() { return iso(new Date()); }
  function addDays(dstr, n) {
    var d = new Date(dstr + 'T00:00:00');
    d.setDate(d.getDate() + n);
    return iso(d);
  }
  function daysBetween(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }
  function fmtDate(dstr) {
    if (!dstr) return '—';
    var d = new Date(dstr + 'T00:00:00');
    return d.toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN', { day: '2-digit', month: 'short' });
  }
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('on');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('on'); }, 2600);
  }

  /* =========================================================
     STORE
     ========================================================= */
  var DB = { rooms: [], stays: [], guests: [], seq: 1 };

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(DB)); }
    catch (e) { toast('Could not save — storage full or blocked'); }
  }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { DB = JSON.parse(raw); return true; }
    } catch (e) { /* corrupted or blocked; fall through to a fresh build */ }
    return false;
  }
  function nextId(p) { return p + (DB.seq++); }

  /* Build the room list from the tariff in config.js.
     Krishna Grand is 16 identical AC rooms over 4 floors, 4 to a
     floor, numbered 101-104, 201-204 and so on.

     If the real building differs, change PER_FLOOR (and the room
     count in config.js). Everything else follows from here.     */
  var PER_FLOOR = 4;

  function buildRooms() {
    var type = (C.rooms[0] && C.rooms[0].id) || 'standard';
    var total = C.totalRooms || C.rooms.length;
    var rooms = [];
    for (var n = 0; n < total; n++) {
      var floor = Math.floor(n / PER_FLOOR) + 1;
      var idx = (n % PER_FLOOR) + 1;
      rooms.push({
        no: String(floor * 100 + idx),
        type: type,
        floor: floor,
        state: 'vacant'   // vacant | cleaning | blocked
      });
    }
    return rooms;
  }

  function roomType(id) {
    return C.rooms.filter(function (r) { return r.id === id; })[0] || { name: id, price: 0 };
  }

  /* =========================================================
     DERIVED STATE
     ========================================================= */
  function activeStay(roomNo) {
    return DB.stays.filter(function (s) { return s.room === roomNo && !s.outAt; })[0] || null;
  }
  function dueDate(s) { return addDays(s.inAt, s.nights); }
  function roomStatus(rm) {
    var s = activeStay(rm.no);
    if (s) return dueDate(s) <= today() ? 'due' : 'occ';
    if (rm.state === 'cleaning') return 'cln';
    if (rm.state === 'blocked') return 'blk';
    return 'vac';
  }
  function guestOf(s) {
    return DB.guests.filter(function (g) { return g.id === s.guestId; })[0] || { name: '—', phone: '' };
  }
  function stayTotal(s) { return s.rate * s.nights; }
  function balance(s) { return stayTotal(s) - (s.advance || 0); }

  /* Spread a stay's revenue across the nights it covers, so a
     7-night stay shows up on 7 days and not as one lump.     */
  function revenueByDay(fromD, toD) {
    var map = {};
    for (var d = fromD; d <= toD; d = addDays(d, 1)) map[d] = { rev: 0, rooms: 0 };
    DB.stays.forEach(function (s) {
      for (var i = 0; i < s.nights; i++) {
        var d = addDays(s.inAt, i);
        if (map[d]) { map[d].rev += s.rate; map[d].rooms += 1; }
      }
    });
    return map;
  }
  function occupiedOn(d) {
    return DB.stays.filter(function (s) {
      return s.inAt <= d && addDays(s.inAt, s.nights) > d;
    }).length;
  }

  /* =========================================================
     RENDER — ROOM BOARD
     ========================================================= */
  function renderBoard() {
    var counts = { vac: 0, occ: 0, due: 0, cln: 0, blk: 0 };
    var floors = {};
    DB.rooms.forEach(function (rm) {
      var st = roomStatus(rm);
      counts[st]++;
      (floors[rm.floor] = floors[rm.floor] || []).push({ rm: rm, st: st });
    });

    $('#cVac').textContent = counts.vac;
    $('#cOcc').textContent = counts.occ;
    $('#cDue').textContent = counts.due;
    $('#cCln').textContent = counts.cln;
    $('#cBlk').textContent = counts.blk;
    var busy = counts.occ + counts.due;
    $('#occPct').textContent = DB.rooms.length ? Math.round(busy / DB.rooms.length * 100) + '%' : '0%';

    var labels = { vac: t('lgVacant'), occ: t('lgOccupied'), due: t('due'), cln: t('lgClean'), blk: t('lgBlocked') };

    $('#floors').innerHTML = Object.keys(floors).sort().map(function (f) {
      var cards = floors[f].map(function (o) {
        var rm = o.rm, st = o.st, s = activeStay(rm.no), ty = roomType(rm.type);
        var g = s ? guestOf(s) : null;
        return '<button class="rm rm-' + st + '" data-room="' + esc(rm.no) + '" type="button">' +
          '<span class="rm-no">' + esc(rm.no) + '</span>' +
          '<span class="rm-ty">' + esc(ty.name) + '</span>' +
          (g ? '<span class="rm-gs">' + esc(g.name) + '</span>' : '') +
          (s ? '<span class="rm-sub">' + esc(t('thOut')) + ' ' + esc(fmtDate(dueDate(s))) +
               ' · ' + esc(inr(s.rate)) + '</span>'
             : '<span class="rm-sub">' + esc(inr(ty.price)) + ' / ' + esc(t('night')) + '</span>') +
          '<span class="rm-st">' + esc(labels[st]) + '</span>' +
        '</button>';
      }).join('');
      return '<section class="floor"><h2>' + (lang === 'te' ? 'అంతస్తు ' : 'Floor ') + esc(f) +
             '</h2><div class="rgrid">' + cards + '</div></section>';
    }).join('');

    $$('#floors .rm').forEach(function (b) {
      b.addEventListener('click', function () { openRoom(b.getAttribute('data-room')); });
    });
  }

  /* =========================================================
     RENDER — TODAY
     ========================================================= */
  function renderToday() {
    var d = today();
    var occ = occupiedOn(d);
    var total = DB.rooms.length || 1;
    var rev = 0, pax = 0;
    DB.stays.forEach(function (s) {
      if (s.inAt <= d && addDays(s.inAt, s.nights) > d) { rev += s.rate; pax += (s.pax || 1); }
    });
    var arrivals = DB.stays.filter(function (s) { return s.inAt === d; }).length;
    var deps = DB.stays.filter(function (s) { return addDays(s.inAt, s.nights) === d; }).length;

    $('#kpis').innerHTML = [
      kpi(Math.round(occ / total * 100) + '%', t('kOcc'), occ + ' / ' + total),
      kpi(inr(occ ? rev / occ : 0), t('kAdr'), lang === 'te' ? 'ఒక గదికి సగటు' : 'Average rate per sold room'),
      kpi(inr(rev / total), t('kRevpar'), lang === 'te' ? 'ఒక గదికి ఆదాయం' : 'Revenue per available room'),
      kpi(inr(rev), t('kRev'), lang === 'te' ? 'గదుల ఆదాయం' : 'Room revenue'),
      kpi(pax, t('kInHouse'), ''),
      kpi(arrivals, t('kArrivals'), ''),
      kpi(deps, t('kDeps'), ''),
      kpi(total - occ, t('kVacant'), '')
    ].join('');

    var inhouse = DB.stays.filter(function (s) { return !s.outAt; })
      .sort(function (a, b) { return a.room.localeCompare(b.room); });
    $('#inhouseTbl').innerHTML = table(
      [t('thRoom'), t('thGuest'), t('thPhone'), t('thSeg'), t('thOut'), t('thBal')],
      inhouse.map(function (s) {
        var g = guestOf(s);
        return [
          '<b>' + esc(s.room) + '</b>',
          esc(g.name),
          waLink(g.phone),
          '<span class="pill">' + esc(segLabel(s.segment)) + '</span>',
          esc(fmtDate(dueDate(s))),
          { num: true, html: inr(balance(s)) }
        ];
      })
    );

    var dueOut = inhouse.filter(function (s) { return dueDate(s) <= today(); });
    $('#dueoutTbl').innerHTML = table(
      [t('thRoom'), t('thGuest'), t('thNights'), t('thTotal'), t('thBal'), ''],
      dueOut.map(function (s) {
        var g = guestOf(s);
        return [
          '<b>' + esc(s.room) + '</b>',
          esc(g.name),
          { num: true, html: String(s.nights) },
          { num: true, html: inr(stayTotal(s)) },
          { num: true, html: inr(balance(s)) },
          '<button class="mini mini-go" data-out="' + esc(s.id) + '" type="button">' + esc(t('doCheckOut')) + '</button>'
        ];
      })
    );
    $$('#dueoutTbl [data-out]').forEach(function (b) {
      b.addEventListener('click', function () { checkOut(b.getAttribute('data-out')); });
    });
  }

  function kpi(big, label, sub) {
    // a long word value ("Corporate / contractor") needs smaller type than
    // a short number value, or it wraps into an unreadable column
    var small = String(big).length > 9 ? ' kpi-sm' : '';
    return '<div class="kpi' + small + '"><b>' + esc(big) + '</b><span>' + esc(label) + '</span>' +
           (sub ? '<small>' + esc(sub) + '</small>' : '') + '</div>';
  }
  function waLink(phone) {
    if (!phone) return '—';
    var digits = String(phone).replace(/\D/g, '');
    var num = digits.length === 10 ? '91' + digits : digits;
    return '<a class="wa" href="https://wa.me/' + esc(num) + '" target="_blank" rel="noopener">💬 ' + esc(phone) + '</a>';
  }
  function table(heads, rows) {
    var th = '<thead><tr>' + heads.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead>';
    if (!rows.length) {
      return th + '<tbody><tr><td class="empty" colspan="' + heads.length + '">' + esc(t('noneYet')) + '</td></tr></tbody>';
    }
    var tb = rows.map(function (cells) {
      return '<tr>' + cells.map(function (c) {
        if (c && typeof c === 'object') return '<td class="' + (c.num ? 'num' : '') + '">' + c.html + '</td>';
        return '<td>' + c + '</td>';
      }).join('') + '</tr>';
    }).join('');
    return th + '<tbody>' + tb + '</tbody>';
  }

  /* =========================================================
     RENDER — REGISTER
     ========================================================= */
  function renderRegister() {
    var from = $('#regFrom').value, to = $('#regTo').value;
    var q = $('#regSearch').value.trim().toLowerCase();

    var rows = DB.stays.filter(function (s) {
      if (from && s.inAt < from) return false;
      if (to && s.inAt > to) return false;
      if (!q) return true;
      var g = guestOf(s);
      return [g.name, g.phone, g.idNo, g.address, s.room, s.source].join(' ').toLowerCase().indexOf(q) > -1;
    }).sort(function (a, b) { return b.inAt.localeCompare(a.inAt) || b.id.localeCompare(a.id); });

    $('#regTbl').innerHTML = table(
      [t('thIn'), t('thRoom'), t('thGuest'), t('thPhone'), t('thId'), t('thAddr'),
       t('thPax'), t('thNights'), t('thSeg'), t('thSource'), t('thTotal'), t('thPaid')],
      rows.map(function (s) {
        var g = guestOf(s);
        return [
          esc(fmtDate(s.inAt)), '<b>' + esc(s.room) + '</b>', esc(g.name), esc(g.phone),
          esc(g.idType + ' ' + g.idNo), esc(g.address || '—'),
          { num: true, html: String(s.pax || 1) },
          { num: true, html: String(s.nights) },
          '<span class="pill">' + esc(segLabel(s.segment)) + '</span>',
          esc(s.source),
          { num: true, html: inr(stayTotal(s)) },
          { num: true, html: inr(s.advance || 0) }
        ];
      })
    );
    renderRegister._rows = rows;
  }

  /* =========================================================
     RENDER — GUEST DATABASE
     ========================================================= */
  function renderGuests() {
    var q = $('#gSearch').value.trim().toLowerCase();
    var seg = $('#gSeg').value;

    var rows = DB.guests.map(function (g) {
      var mine = DB.stays.filter(function (s) { return s.guestId === g.id; });
      var last = mine.map(function (s) { return s.inAt; }).sort().pop();
      var spend = mine.reduce(function (a, s) { return a + stayTotal(s); }, 0);
      var segs = {};
      mine.forEach(function (s) { segs[s.segment] = (segs[s.segment] || 0) + 1; });
      var topSeg = Object.keys(segs).sort(function (a, b) { return segs[b] - segs[a]; })[0] || g.segment;
      return { g: g, stays: mine.length, last: last, spend: spend, seg: topSeg };
    }).filter(function (r) {
      if (seg && r.seg !== seg) return false;
      if (!q) return true;
      return (r.g.name + ' ' + r.g.phone).toLowerCase().indexOf(q) > -1;
    }).sort(function (a, b) { return (b.last || '').localeCompare(a.last || ''); });

    $('#gTbl').innerHTML = table(
      [t('thGuest'), t('thPhone'), t('thSeg'), t('thStays'), t('thLast'), t('thTotal'), t('thAddr')],
      rows.map(function (r) {
        return [
          esc(r.g.name) + (r.stays > 1 ? ' <span class="pill">↻ ' + r.stays + '</span>' : ''),
          waLink(r.g.phone),
          '<span class="pill">' + esc(segLabel(r.seg)) + '</span>',
          { num: true, html: String(r.stays) },
          esc(fmtDate(r.last)),
          { num: true, html: inr(r.spend) },
          esc(r.g.address || '—')
        ];
      })
    );
    renderGuests._rows = rows;
  }

  /* =========================================================
     RENDER — REPORTS
     ========================================================= */
  function renderReports() {
    var days = Number($('#repDays').value) || 30;
    var to = today(), from = addDays(to, -(days - 1));
    var map = revenueByDay(from, to);
    var keys = Object.keys(map).sort();

    var totalRev = 0, totalRooms = 0;
    keys.forEach(function (k) { totalRev += map[k].rev; totalRooms += map[k].rooms; });
    var capacity = DB.rooms.length * keys.length || 1;

    var inWindow = DB.stays.filter(function (s) { return s.inAt >= from && s.inAt <= to; });
    var avgStay = inWindow.length
      ? (inWindow.reduce(function (a, s) { return a + s.nights; }, 0) / inWindow.length)
      : 0;

    var segTotals = {};
    inWindow.forEach(function (s) {
      segTotals[s.segment] = (segTotals[s.segment] || 0) + stayTotal(s);
    });
    var topSeg = Object.keys(segTotals).sort(function (a, b) { return segTotals[b] - segTotals[a]; })[0];

    $('#repKpis').innerHTML = [
      kpi(inr(totalRev), t('kRevTotal'), days + (lang === 'te' ? ' రోజులు' : ' days')),
      kpi(Math.round(totalRooms / capacity * 100) + '%', t('kOcc'), totalRooms + ' / ' + capacity),
      kpi(inr(totalRooms ? totalRev / totalRooms : 0), t('kAdr'), ''),
      kpi(inr(totalRev / capacity), t('kRevpar'), ''),
      kpi(totalRooms, t('kNights'), ''),
      kpi(avgStay.toFixed(1), t('kAvgStay'), t('nights')),
      kpi(topSeg ? segLabel(topSeg) : '—', t('kTopSeg'), topSeg ? inr(segTotals[topSeg]) : '')
    ].join('');

    var max = Math.max.apply(null, keys.map(function (k) { return map[k].rev; }).concat([1]));
    $('#chart').innerHTML = keys.map(function (k) {
      var h = Math.round(map[k].rev / max * 100);
      var pct = DB.rooms.length ? Math.round(map[k].rooms / DB.rooms.length * 100) : 0;
      return '<div class="cbar" data-tip="' + esc(fmtDate(k) + ' · ' + inr(map[k].rev) + ' · ' + pct + '%') + '">' +
             '<i style="height:' + h + '%"></i></div>';
    }).join('');

    /* by source — this table tells you which marketing channel
       is actually working, which is the whole point of tracking
       "Booking came from" at check-in. */
    var srcTotals = {}, srcCount = {};
    inWindow.forEach(function (s) {
      srcTotals[s.source] = (srcTotals[s.source] || 0) + stayTotal(s);
      srcCount[s.source] = (srcCount[s.source] || 0) + 1;
    });
    var srcSum = Object.keys(srcTotals).reduce(function (a, k) { return a + srcTotals[k]; }, 0) || 1;
    $('#segTbl').innerHTML = table(
      [t('thSource'), t('thGuests'), t('thRev'), t('thShare')],
      Object.keys(srcTotals).sort(function (a, b) { return srcTotals[b] - srcTotals[a]; }).map(function (k) {
        return [esc(k),
          { num: true, html: String(srcCount[k]) },
          { num: true, html: inr(srcTotals[k]) },
          { num: true, html: Math.round(srcTotals[k] / srcSum * 100) + '%' }];
      })
    );

    var tyTotals = {}, tyCount = {};
    inWindow.forEach(function (s) {
      var rm = DB.rooms.filter(function (r) { return r.no === s.room; })[0];
      var ty = rm ? roomType(rm.type).name : '—';
      tyTotals[ty] = (tyTotals[ty] || 0) + stayTotal(s);
      tyCount[ty] = (tyCount[ty] || 0) + s.nights;
    });
    var tySum = Object.keys(tyTotals).reduce(function (a, k) { return a + tyTotals[k]; }, 0) || 1;
    $('#typeTbl').innerHTML = table(
      [t('thType'), t('thNights'), t('thRev'), t('thShare')],
      Object.keys(tyTotals).sort(function (a, b) { return tyTotals[b] - tyTotals[a]; }).map(function (k) {
        return [esc(k),
          { num: true, html: String(tyCount[k]) },
          { num: true, html: inr(tyTotals[k]) },
          { num: true, html: Math.round(tyTotals[k] / tySum * 100) + '%' }];
      })
    );
  }

  /* =========================================================
     CHECK IN / OUT
     ========================================================= */
  var ciRoomNo = null;

  function openRoom(no) {
    var rm = DB.rooms.filter(function (r) { return r.no === no; })[0];
    if (!rm) return;
    var s = activeStay(no);
    var ty = roomType(rm.type);

    if (!s) {
      // vacant-ish: offer check-in plus housekeeping actions
      $('#rdRoom').textContent = no;
      $('#rdBody').innerHTML = '<dl class="kv">' +
        '<dt>' + esc(t('thType')) + '</dt><dd>' + esc(ty.name) + '</dd>' +
        '<dt>' + esc(t('thRate')) + '</dt><dd>' + esc(inr(ty.price)) + '</dd>' +
        '<dt>' + esc(t('lgVacant')) + '</dt><dd>' + esc(rm.state) + '</dd></dl>';
      $('#rdFoot').innerHTML =
        '<button class="mini" type="button" data-act="state">' +
          esc(rm.state === 'cleaning' ? t('markReady') : t('markClean')) + '</button>' +
        '<button class="mini" type="button" data-act="block">' +
          esc(rm.state === 'blocked' ? t('unblock') : t('block')) + '</button>' +
        '<button class="mini mini-go" type="button" data-act="in">' + esc(t('doCheckIn')) + '</button>';
      wireRoomFoot(rm, null);
    } else {
      var g = guestOf(s);
      $('#rdRoom').textContent = no;
      $('#rdBody').innerHTML = '<dl class="kv">' +
        '<dt>' + esc(t('thGuest')) + '</dt><dd>' + esc(g.name) + '</dd>' +
        '<dt>' + esc(t('thPhone')) + '</dt><dd>' + waLink(g.phone) + '</dd>' +
        '<dt>' + esc(t('thId')) + '</dt><dd>' + esc(g.idType + ' ' + g.idNo) + '</dd>' +
        '<dt>' + esc(t('thSeg')) + '</dt><dd>' + esc(segLabel(s.segment)) + '</dd>' +
        '<dt>' + esc(t('thSource')) + '</dt><dd>' + esc(s.source) + '</dd>' +
        '<dt>' + esc(t('thIn')) + '</dt><dd>' + esc(fmtDate(s.inAt)) + '</dd>' +
        '<dt>' + esc(t('thOut')) + '</dt><dd>' + esc(fmtDate(dueDate(s))) + '</dd>' +
        '<dt>' + esc(t('thNights')) + '</dt><dd>' + s.nights + '</dd>' +
        '<dt>' + esc(t('thRate')) + '</dt><dd>' + esc(inr(s.rate)) + '</dd>' +
        '<dt>' + esc(t('thTotal')) + '</dt><dd>' + esc(inr(stayTotal(s))) + '</dd>' +
        '<dt>' + esc(t('thPaid')) + '</dt><dd>' + esc(inr(s.advance || 0)) + '</dd>' +
        '<dt>' + esc(t('balanceDue')) + '</dt><dd>' + esc(inr(balance(s))) + '</dd>' +
        (s.note ? '<dt>' + esc(t('fNote')) + '</dt><dd>' + esc(s.note) + '</dd>' : '') +
        '</dl>';
      $('#rdFoot').innerHTML =
        '<button class="mini" type="button" data-act="extend">' + esc(t('extend')) + '</button>' +
        '<button class="mini mini-go" type="button" data-act="out">' + esc(t('doCheckOut')) + '</button>';
      wireRoomFoot(rm, s);
    }
    $('#roomDlg').showModal();
  }

  function wireRoomFoot(rm, s) {
    $$('#rdFoot [data-act]').forEach(function (b) {
      b.addEventListener('click', function () {
        var a = b.getAttribute('data-act');
        if (a === 'state') { rm.state = rm.state === 'cleaning' ? 'vacant' : 'cleaning'; save(); }
        if (a === 'block') { rm.state = rm.state === 'blocked' ? 'vacant' : 'blocked'; save(); }
        if (a === 'extend') { s.nights += 1; save(); toast(t('msgSaved')); }
        $('#roomDlg').close();
        if (a === 'in') { openCheckIn(rm); return; }
        if (a === 'out') { checkOut(s.id); return; }
        refresh();
      });
    });
  }

  function openCheckIn(rm) {
    ciRoomNo = rm.no;
    var ty = roomType(rm.type);
    $('#ciRoom').textContent = rm.no + ' · ' + ty.name;
    var f = $('#ciForm');
    f.reset();
    $('#ciRate').value = ty.price;
    $('#ciNights').value = 1;
    updateCalc();
    $('#ciDlg').showModal();
    setTimeout(function () { f.name.focus(); }, 40);
  }

  function updateCalc() {
    var n = Number($('#ciNights').value) || 1;
    var r = Number($('#ciRate').value) || 0;
    var a = Number($('#ciForm').advance.value) || 0;
    var total = n * r;
    $('#ciCalc').innerHTML =
      esc(t('thTotal')) + ': <b>' + inr(total) + '</b> &nbsp; · &nbsp; ' +
      esc(t('balanceDue')) + ': <b>' + inr(total - a) + '</b><br>' +
      '<span style="font-weight:500">' + esc(t('thOut')) + ': ' + esc(fmtDate(addDays(today(), n))) + '</span>';
  }

  function doCheckIn() {
    var f = $('#ciForm');
    var phone = f.phone.value.trim();

    // reuse an existing guest record when the phone matches,
    // so repeat guests build up a history instead of duplicates
    var g = DB.guests.filter(function (x) { return x.phone === phone; })[0];
    if (!g) {
      g = { id: nextId('g'), name: '', phone: phone, idType: '', idNo: '', address: '', segment: '' };
      DB.guests.push(g);
    }
    g.name = f.name.value.trim();
    g.idType = f.idType.value;
    g.idNo = f.idNo.value.trim();
    g.address = f.address.value.trim();
    g.segment = f.segment.value;

    DB.stays.push({
      id: nextId('s'),
      room: ciRoomNo,
      guestId: g.id,
      inAt: today(),
      nights: Math.max(1, Number(f.nights.value) || 1),
      rate: Math.max(0, Number(f.rate.value) || 0),
      advance: Math.max(0, Number(f.advance.value) || 0),
      payMode: f.payMode.value,
      source: f.source.value,
      segment: f.segment.value,
      pax: Math.max(1, Number(f.pax.value) || 1),
      note: f.note.value.trim(),
      outAt: null
    });

    var rm = DB.rooms.filter(function (r) { return r.no === ciRoomNo; })[0];
    if (rm) rm.state = 'vacant';
    save();
    toast(t('msgIn') + ' — ' + t('room') + ' ' + ciRoomNo);
    refresh();
  }

  function checkOut(stayId) {
    var s = DB.stays.filter(function (x) { return x.id === stayId; })[0];
    if (!s) return;
    var bal = balance(s);
    var msg = t('confirmOut') + '\n\n' + t('room') + ' ' + s.room + ' · ' + guestOf(s).name +
              '\n' + t('thTotal') + ': ' + inr(stayTotal(s)) +
              '\n' + t('balanceDue') + ': ' + inr(bal);
    if (!window.confirm(msg)) return;
    s.outAt = new Date().toISOString();
    s.advance = stayTotal(s);            // settled at checkout
    var rm = DB.rooms.filter(function (r) { return r.no === s.room; })[0];
    if (rm) rm.state = 'cleaning';       // always clean before reselling
    save();
    toast(t('msgOut') + ' — ' + t('room') + ' ' + s.room);
    refresh();
  }

  /* =========================================================
     CSV / BACKUP
     ========================================================= */
  function csv(rows) {
    return rows.map(function (r) {
      return r.map(function (c) {
        var v = c == null ? '' : String(c);
        return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
      }).join(',');
    }).join('\n');
  }
  function download(name, text, type) {
    var blob = new Blob(['﻿' + text], { type: (type || 'text/csv') + ';charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function exportRegister() {
    var rows = [['Check-in','Room','Guest','Phone','ID type','ID number','Address','Guests',
                 'Nights','Check-out','Purpose','Source','Rate','Total','Paid','Payment','Note']];
    (renderRegister._rows || []).forEach(function (s) {
      var g = guestOf(s);
      rows.push([s.inAt, s.room, g.name, g.phone, g.idType, g.idNo, g.address, s.pax || 1,
                 s.nights, dueDate(s), segLabel(s.segment), s.source, s.rate,
                 stayTotal(s), s.advance || 0, s.payMode, s.note || '']);
    });
    download('guest-register-' + today() + '.csv', csv(rows));
  }
  function exportGuests() {
    var rows = [['Name','Phone','Purpose','Stays','Last stay','Total spend','ID type','ID number','Address']];
    (renderGuests._rows || []).forEach(function (r) {
      rows.push([r.g.name, r.g.phone, segLabel(r.seg), r.stays, r.last || '',
                 r.spend, r.g.idType, r.g.idNo, r.g.address]);
    });
    download('guest-database-' + today() + '.csv', csv(rows));
  }
  function backup() {
    download('lodge-backup-' + today() + '.json', JSON.stringify(DB, null, 2), 'application/json');
    toast(t('msgBackup'));
  }
  function restore(file) {
    var fr = new FileReader();
    fr.onload = function () {
      try {
        var d = JSON.parse(fr.result);
        if (!d || !Array.isArray(d.rooms) || !Array.isArray(d.stays) || !Array.isArray(d.guests)) {
          throw new Error('shape');
        }
        DB = d;
        save();
        toast(t('msgRestored'));
        refresh();
      } catch (e) { toast(t('msgBadFile')); }
    };
    fr.onerror = function () { toast(t('msgBadFile')); };
    fr.readAsText(file);
  }

  /* =========================================================
     SEED — sample history so the reports are not empty
     ========================================================= */
  function seed() {
    /* Names are drawn as matched pairs rather than mixing two random
       pools, which otherwise produces combinations no real guest has. */
    var namePools = [
      { first: ['Ravi','Suresh','Naveen','Mahesh','Kiran','Rajesh','Bhaskar','Venkat','Srinivas','Prasad'],
        last:  ['Kumar','Reddy','Naidu','Rao','Chowdary','Yadav','Babu'] },
      { first: ['Lakshmi','Anitha','Sridevi','Padma','Sunitha','Bhavani','Swapna','Vijaya'],
        last:  ['Reddy','Devi','Naidu','Rao','Kumari','Chowdary'] },
      { first: ['Imran','Arif','Rafi','Khaleel','Mastan','Nazeer'],
        last:  ['Shaik','Khan','Basha','Ahmed'] },
      { first: ['Fathima','Yasmin','Nasreen','Shabana','Ayesha'],
        last:  ['Begum','Shaik','Khatoon'] }
    ];
    var towns = ['Proddatur','Pulivendula','Rajampet','Jammalamadugu','Mydukur','Badvel','Kurnool',
                 'Nandyal','Tirupati','Hyderabad','Bengaluru','Chennai','Anantapur','Nellore'];
    var idTypes = ['Aadhaar','Voter ID','Driving Licence','PAN'];
    var segWeights = ['medical','medical','medical','pilgrim','pilgrim','pilgrim','transit','transit',
                      'corporate','corporate','govt','exam','family','wedding'];
    var srcWeights = ['Walk-in','Walk-in','Walk-in','Phone call','Phone call','Google Maps','Google Maps',
                      'WhatsApp','MakeMyTrip','Goibibo','Auto / taxi driver','Hospital referral',
                      'Travel agent','Repeat guest','Website'];

    function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
    function phone() { return '9' + String(Math.floor(100000000 + Math.random() * 899999999)); }

    var used = {};   // room -> last occupied date, to avoid overlaps
    for (var day = 45; day >= 0; day--) {
      var d = addDays(today(), -day);
      var arrivals = 2 + Math.floor(Math.random() * 4);
      for (var a = 0; a < arrivals; a++) {
        var rm = pick(DB.rooms);
        if (used[rm.no] && used[rm.no] > d) continue;
        var ty = roomType(rm.type);
        var seg = pick(segWeights);
        // medical and corporate guests stay much longer
        var n = seg === 'medical' ? 3 + Math.floor(Math.random() * 8)
              : seg === 'corporate' ? 4 + Math.floor(Math.random() * 10)
              : 1 + Math.floor(Math.random() * 2);
        if (addDays(d, n) > addDays(today(), 3)) n = Math.max(1, daysBetween(d, addDays(today(), 3)));

        var pool = pick(namePools);
        var g = {
          id: nextId('g'),
          name: pick(pool.first) + ' ' + pick(pool.last),
          phone: phone(),
          idType: pick(idTypes),
          idNo: 'XXXX' + Math.floor(1000 + Math.random() * 8999),
          address: pick(towns),
          segment: seg
        };
        DB.guests.push(g);

        // pricing is flat, so every stay bills at the same rate
        var rate = ty.price;

        var ended = addDays(d, n) <= today();
        DB.stays.push({
          id: nextId('s'), room: rm.no, guestId: g.id, inAt: d, nights: n, rate: rate,
          advance: ended ? rate * n : Math.round(rate * 0.5),
          payMode: pick(['Cash','UPI','UPI','Card','OTA / prepaid']),
          source: pick(srcWeights), segment: seg,
          pax: 1 + Math.floor(Math.random() * 3), note: '',
          outAt: ended ? new Date(addDays(d, n) + 'T11:00:00').toISOString() : null
        });
        used[rm.no] = addDays(d, n);
      }
    }
  }

  /* =========================================================
     BOOT
     ========================================================= */
  function applyI18n() {
    document.body.classList.toggle('te', lang === 'te');
    document.documentElement.lang = lang;
    $$('[data-i]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i')); });
    $('#langBtn').textContent = lang === 'en' ? 'తెలుగు' : 'English';
    $('#topName').textContent = (lang === 'te' ? C.nameTe : C.name);
    $('#topDate').textContent = new Date().toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN',
      { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    $('#regSearch').placeholder = lang === 'te' ? 'పేరు, ఫోన్, గది, ఐడీ…' : 'Name, phone, room, ID…';
    $('#gSearch').placeholder = lang === 'te' ? 'పేరు లేదా ఫోన్ వెతకండి…' : 'Search name or phone…';

    var segOpts = SEGMENTS.map(function (s) {
      return '<option value="' + s[0] + '">' + esc(lang === 'te' ? s[2] : s[1]) + '</option>';
    }).join('');
    $('#ciSeg').innerHTML = segOpts;
    $('#gSeg').innerHTML = '<option value="">' + esc(t('allSegments')) + '</option>' + segOpts;
    $('#ciSource').innerHTML = SOURCES.map(function (s) { return '<option>' + esc(s) + '</option>'; }).join('');
  }

  function refresh() {
    renderBoard(); renderToday(); renderRegister(); renderGuests(); renderReports();
  }

  function init() {
    if (!load()) {
      DB.rooms = buildRooms();
      seed();
      save();
      setTimeout(function () { toast(t('seeded')); }, 700);
    }
    if (!DB.rooms || !DB.rooms.length) { DB.rooms = buildRooms(); save(); }

    try {
      var sl = localStorage.getItem('lodge.lang');
      if (sl === 'te' || sl === 'en') lang = sl;
    } catch (_) {}

    applyI18n();

    // default register window: last 30 days
    $('#regFrom').value = addDays(today(), -30);
    $('#regTo').value = today();

    refresh();

    /* tabs */
    $$('.tab').forEach(function (b) {
      b.addEventListener('click', function () {
        $$('.tab').forEach(function (x) { x.classList.toggle('is-on', x === b); });
        var id = b.getAttribute('data-tab');
        $$('.panel').forEach(function (p) { p.classList.toggle('is-on', p.id === 'p-' + id); });
      });
    });

    /* language */
    $('#langBtn').addEventListener('click', function () {
      lang = lang === 'en' ? 'te' : 'en';
      try { localStorage.setItem('lodge.lang', lang); } catch (_) {}
      applyI18n();
      refresh();
    });

    /* check-in dialog: cancel must not trip HTML validation */
    $$('#ciForm button[value="cancel"], #roomForm button[value="cancel"]').forEach(function (b) {
      b.setAttribute('formnovalidate', '');
    });
    $('#ciDlg').addEventListener('close', function () {
      if ($('#ciDlg').returnValue === 'ok') doCheckIn();
    });
    ['nights', 'rate', 'advance'].forEach(function (n) {
      $('#ciForm')[n].addEventListener('input', updateCalc);
    });

    /* filters */
    ['#regFrom', '#regTo'].forEach(function (s) { $(s).addEventListener('change', renderRegister); });
    $('#regSearch').addEventListener('input', renderRegister);
    $('#gSearch').addEventListener('input', renderGuests);
    $('#gSeg').addEventListener('change', renderGuests);
    $('#repDays').addEventListener('change', renderReports);

    /* exports & backup */
    $('#regCsv').addEventListener('click', exportRegister);
    $('#gCsv').addEventListener('click', exportGuests);
    $('#backupBtn').addEventListener('click', backup);
    $('#restoreBtn').addEventListener('click', function () { $('#restoreFile').click(); });
    $('#restoreFile').addEventListener('change', function (e) {
      if (e.target.files && e.target.files[0]) restore(e.target.files[0]);
      e.target.value = '';
    });
  }

  /* If anything in init() throws, the page would otherwise render as a
     blank white screen with no clue why. Show the error instead. */
  function boot() {
    try {
      init();
    } catch (e) {
      var box = document.createElement('div');
      box.setAttribute('role', 'alert');
      box.style.cssText = 'margin:24px;padding:20px;border:2px solid #b31b3f;border-radius:12px;' +
        'background:#fdeef2;color:#141a2b;font:15px/1.6 system-ui,sans-serif;max-width:640px';
      box.innerHTML = '<strong style="display:block;font-size:17px;margin-bottom:8px">' +
        'The reception desk could not start</strong>' +
        '<p style="margin:0 0 10px">Reload the page. If it keeps failing, the browser may be ' +
        'blocking local storage \u2014 try a normal window rather than a private one.</p>' +
        '<code style="display:block;padding:10px;background:#fff;border-radius:8px;' +
        'font-size:13px;word-break:break-word"></code>';
      box.querySelector('code').textContent = (e && e.message) || String(e);
      document.body.insertBefore(box, document.body.firstChild);
    }
  }

  /* Let the browser paint the header, tabs and legend before doing the
     seeding and five renders. Otherwise a slow device shows nothing at
     all until all of that finishes. */
  function start() {
    if (window.requestAnimationFrame) requestAnimationFrame(function () { setTimeout(boot, 0); });
    else setTimeout(boot, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
