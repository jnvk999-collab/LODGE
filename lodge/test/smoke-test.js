/* Browser smoke test for the website and the reception desk.
 *
 *   npm i -D playwright && npx playwright install chromium
 *   npx http-server .. -p 8899 &
 *   node smoke-test.js
 *
 * Set PW_CHROMIUM to use a Chromium you already have installed.
 */
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://127.0.0.1:8899';

(async () => {
  const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  let fail = 0;
  const log = (ok, msg) => { if (!ok) fail++; console.log((ok ? '  PASS ' : '  FAIL ') + msg); };

  // ---------------- SITE ----------------
  console.log('\n=== WEBSITE ===');
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const errs = [];
    page.on('console', m => m.type() === 'error' && !/ERR_CERT_AUTHORITY_INVALID/.test(m.text()) && errs.push(m.text()));
    page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
    await page.goto(BASE + '/site/index.html', { waitUntil: 'networkidle' });

    log(errs.length === 0, 'no console errors' + (errs.length ? ': ' + errs.join(' | ') : ''));
    log((await page.locator('.room').count()) === 1, 'renders the single room category');
    log((await page.locator('.rooms.is-single').count()) === 1, 'single category uses the wide feature layout');
    log((await page.locator('.amen li').count()) === 12, 'renders 12 amenities');
    const amenTxt = await page.locator('.amen').innerText();
    log(/coffee/i.test(amenTxt) && !/breakfast/i.test(amenTxt), 'amenities list free coffee, not breakfast');
    log((await page.locator('.dist tbody tr').count()) === 8, 'renders 8 distance rows');
    log((await page.locator('.offer').count()) === 4, 'renders 4 offers');
    log(await page.locator('#gallery').isHidden(), 'gallery section is hidden while photosReady is false');
    log((await page.locator('.photo-pending').count()) === 1, 'room shows a photo-pending panel, not a fake placeholder image');
    log(await page.locator('#longstay').isHidden(), 'long-stay panel is hidden while its list is empty');
    log((await page.locator('.rev').count()) === 3, 'renders 3 reviews');
    log((await page.locator('.tr-item').count()) === 4, 'renders 4 trust stats');
    log((await page.locator('#policyList li').count()) === 7, 'renders 7 policies');

    const h1 = await page.locator('h1').innerText();
    log(h1.includes('1,199') && !/from/i.test(h1), 'hero states the flat rate, not a "from" price: "' + h1 + '"');

    const waHref = await page.locator('.hero-cta .btn-wa').getAttribute('href');
    log(waHref.startsWith('https://wa.me/919999900000?text='), 'hero WhatsApp link prefilled');

    const tel = await page.locator('.sb-call').getAttribute('href');
    log(tel === 'tel:+919999900000', 'sticky call button dials config number');

    // JSON-LD schema
    const ld = await page.locator('script[type="application/ld+json"]').innerText();
    const j = JSON.parse(ld);
    log(j['@type'] === 'Hotel', 'JSON-LD is a Hotel');
    log(j.makesOffer.length === 1 && j.makesOffer[0].price === 1199, 'JSON-LD offers one room at 1199');
    log(j.numberOfRooms === 16, 'JSON-LD reports 16 rooms');
    log(j.geo === undefined, 'JSON-LD omits geo while coordinates are unverified');
    log(j.aggregateRating.ratingValue === 4.5, 'JSON-LD carries rating');
    log(j.address.addressLocality === 'Kadapa', 'JSON-LD address is Kadapa');
    log(/Chinna Chauku/.test(j.address.streetAddress), 'JSON-LD street address is Chinna Chauku: ' + j.address.streetAddress);
    const eyebrow = await page.locator('.eyebrow').innerText();
    log(/CHINNA CHAUKU/i.test(eyebrow), 'hero names the real locality: ' + eyebrow);
    const d0 = await page.locator('.dist tbody tr').first().innerText();
    log(/~/.test(d0), 'unmeasured distances render with ~ : ' + d0.replace(/\n/g, ' | '));

    // booking form estimate
    await page.locator('#bkIn').fill('2026-10-01');
    await page.locator('#bkOut').fill('2026-10-04');
    await page.selectOption('#bkRoom', 'standard');
    await page.selectOption('#bkQty', '2');
    await page.waitForTimeout(150);
    const est = await page.locator('#est').innerText();
    log(/7,194/.test(est), 'estimate = 1199 x 3 nights x 2 rooms = Rs 7,194 -> "' + est.replace(/\n/g, ' ') + '"');

    // no horizontal overflow on a phone
    const ovf = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    log(ovf <= 0, 'no horizontal scroll at 390px (overflow=' + ovf + ')');

    // language toggle
    await page.locator('#langBtn').click();
    await page.waitForTimeout(200);
    const teH1 = await page.locator('h1').innerText();
    log(/[ఀ-౿]/.test(teH1), 'Telugu toggle switches headings');
    const teBtn = await page.locator('#langBtn').innerText();
    log(teBtn === 'English', 'toggle flips back-label to English');
    await page.locator('#langBtn').click();
    await page.waitForTimeout(200);

    await page.screenshot({ path: '/tmp/shot-site-mobile.png', fullPage: true });
    const wide = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await wide.goto(BASE + '/site/index.html', { waitUntil: 'networkidle' });
    await wide.screenshot({ path: '/tmp/shot-site-desktop.png', fullPage: true });
    await wide.close();
    await page.close();
  }

  // ---------------- PMS ----------------
  console.log('\n=== RECEPTION DESK (PMS) ===');
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errs = [];
    page.on('console', m => m.type() === 'error' && !/ERR_CERT_AUTHORITY_INVALID/.test(m.text()) && errs.push(m.text()));
    page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
    page.on('dialog', d => d.accept());
    await page.goto(BASE + '/pms/index.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    log(errs.length === 0, 'no console errors' + (errs.length ? ': ' + errs.join(' | ') : ''));
    log((await page.locator('.rm').count()) === 16, 'builds 16 rooms');
    log((await page.locator('.floor').count()) === 4, 'groups rooms into 4 floors');

    const seeded = await page.evaluate(() => JSON.parse(localStorage.getItem('lodge.pms.v1')));
    log(seeded.stays.length > 50, 'seeded ' + seeded.stays.length + ' sample stays');
    log(seeded.guests.length > 50, 'seeded ' + seeded.guests.length + ' sample guests');

    const occ = await page.locator('#occPct').innerText();
    log(/^\d+%$/.test(occ), 'occupancy shown on board: ' + occ);

    // counts must add up to the room count
    const c = await page.evaluate(() => ['cVac','cOcc','cDue','cCln','cBlk']
      .reduce((a, id) => a + Number(document.getElementById(id).textContent), 0));
    log(c === 16, 'status counts sum to 16 (got ' + c + ')');

    // Today tab
    await page.locator('[data-tab="today"]').click();
    await page.waitForTimeout(200);
    log((await page.locator('#p-today .kpi').count()) === 8, 'Today shows 8 KPIs');
    const kpiTxt = await page.locator('#p-today .kpi').first().innerText();
    log(/%/.test(kpiTxt), 'first KPI is occupancy %: ' + kpiTxt.replace(/\n/g, ' '));

    // Reports tab
    await page.locator('[data-tab="reports"]').click();
    await page.waitForTimeout(250);
    log((await page.locator('#chart .cbar').count()) === 30, 'chart draws 30 daily bars');
    log((await page.locator('#segTbl tbody tr').count()) > 3, 'source breakdown table populated');
    log((await page.locator('#typeTbl tbody tr').count()) >= 1, 'room-type revenue table populated');
    const revKpi = await page.locator('#repKpis .kpi').first().innerText();
    log(/₹/.test(revKpi), 'revenue KPI formatted in rupees: ' + revKpi.replace(/\n/g, ' '));

    // Register tab + search
    await page.locator('[data-tab="register"]').click();
    await page.waitForTimeout(200);
    const regRows = await page.locator('#regTbl tbody tr').count();
    log(regRows > 10, 'register lists ' + regRows + ' stays in last 30 days');
    await page.locator('#regSearch').fill('zzzznotfound');
    await page.waitForTimeout(200);
    log((await page.locator('#regTbl .empty').count()) === 1, 'register search filters to empty state');
    await page.locator('#regSearch').fill('');
    await page.waitForTimeout(200);

    // Guest DB
    await page.locator('[data-tab="guests"]').click();
    await page.waitForTimeout(200);
    log((await page.locator('#gTbl tbody tr').count()) > 10, 'guest database populated');
    log((await page.locator('#gTbl .wa').count()) > 0, 'guest rows carry WhatsApp links');
    await page.selectOption('#gSeg', 'medical');
    await page.waitForTimeout(200);
    const medRows = await page.locator('#gTbl tbody tr').count();
    log(medRows > 0, 'segment filter works (medical: ' + medRows + ' guests)');
    await page.selectOption('#gSeg', '');

    // ---- CHECK-IN FLOW ----
    await page.locator('[data-tab="board"]').click();
    await page.waitForTimeout(200);
    const vacBefore = Number(await page.locator('#cVac').innerText());
    const vacantRoom = page.locator('.rm.rm-vac').first();
    const roomNo = (await vacantRoom.locator('.rm-no').innerText()).trim();
    await vacantRoom.click();
    await page.waitForTimeout(250);
    log(await page.locator('#roomWrap').isVisible(), 'clicking a vacant room opens the room overlay');
    log((await page.locator('dialog').count()) === 0, 'no <dialog> elements (old Android WebViews mishandle them)');
    await page.locator('#rdFoot [data-act="in"]').click();
    await page.waitForTimeout(250);
    log(await page.locator('#ciWrap').isVisible(), 'check-in overlay opens for room ' + roomNo);

    await page.fill('#ciForm input[name="name"]', 'Test Guest Kadapa');
    await page.fill('#ciForm input[name="phone"]', '9876543210');
    await page.fill('#ciForm input[name="idNo"]', 'AADH1234');
    await page.fill('#ciForm input[name="address"]', 'Proddatur');
    await page.selectOption('#ciSeg', 'medical');
    await page.fill('#ciNights', '5');
    await page.fill('#ciRate', '1199');
    await page.fill('#ciForm input[name="advance"]', '2000');
    await page.waitForTimeout(200);
    const calc = await page.locator('#ciCalc').innerText();
    log(/5,995/.test(calc) && /3,995/.test(calc), 'live calc: 5 x 1199 = 5,995, balance 3,995 -> "' + calc.replace(/\n/g, ' ') + '"');

    await page.locator('#ciConfirm').click();
    await page.waitForTimeout(400);
    log(await page.locator('#ciWrap').isHidden(), 'check-in overlay closes after confirming');
    const vacAfter = Number(await page.locator('#cVac').innerText());
    log(vacAfter === vacBefore - 1, 'vacant count dropped ' + vacBefore + ' -> ' + vacAfter);
    const nowOcc = await page.locator('.rm[data-room="' + roomNo + '"]').getAttribute('class');
    log(/rm-occ/.test(nowOcc), 'room ' + roomNo + ' now shows as occupied');
    const nameOnCard = await page.locator('.rm[data-room="' + roomNo + '"] .rm-gs').innerText();
    log(nameOnCard === 'Test Guest Kadapa', 'guest name appears on the room card');

    // persistence across reload
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const afterReload = await page.locator('.rm[data-room="' + roomNo + '"] .rm-gs').innerText();
    log(afterReload === 'Test Guest Kadapa', 'check-in survives a page reload (saved to storage)');

    // ---- CHECK-OUT FLOW ----
    await page.locator('.rm[data-room="' + roomNo + '"]').click();
    await page.waitForTimeout(250);
    const kv = await page.locator('#rdBody').innerText();
    log(/3,995/.test(kv), 'room dialog shows balance due 3,995');
    await page.locator('#rdFoot [data-act="out"]').click();
    await page.waitForTimeout(500);
    const cls = await page.locator('.rm[data-room="' + roomNo + '"]').getAttribute('class');
    log(/rm-cln/.test(cls), 'after checkout the room goes to Cleaning, not straight to Vacant');

    // CSV export
    await page.locator('[data-tab="register"]').click();
    await page.waitForTimeout(200);
    const dl = await Promise.all([
      page.waitForEvent('download', { timeout: 5000 }),
      page.locator('#regCsv').click()
    ]).then(r => r[0]).catch(() => null);
    log(!!dl && /guest-register-.*\.csv/.test(dl.suggestedFilename()), 'register exports a CSV: ' + (dl ? dl.suggestedFilename() : 'FAILED'));

    // Backup export
    const bk = await Promise.all([
      page.waitForEvent('download', { timeout: 5000 }),
      page.locator('#backupBtn').click()
    ]).then(r => r[0]).catch(() => null);
    log(!!bk && /lodge-backup-.*\.json/.test(bk.suggestedFilename()), 'backup exports JSON: ' + (bk ? bk.suggestedFilename() : 'FAILED'));

    // Telugu toggle
    await page.locator('#langBtn').click();
    await page.waitForTimeout(300);
    const tab0 = await page.locator('.tab').first().innerText();
    log(/[ఀ-౿]/.test(tab0), 'PMS switches to Telugu: "' + tab0 + '"');
    await page.locator('#langBtn').click();
    await page.waitForTimeout(300);

    await page.locator('[data-tab="board"]').click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: '/tmp/shot-pms-board.png', fullPage: true });
    await page.locator('[data-tab="reports"]').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: '/tmp/shot-pms-reports.png', fullPage: true });
    log(errs.length === 0, 'still no console errors after full flow' + (errs.length ? ': ' + errs.join(' | ') : ''));
    await page.close();
  }

  await browser.close();
  console.log('\n' + (fail === 0 ? 'ALL CHECKS PASSED' : fail + ' CHECK(S) FAILED'));
  process.exit(fail === 0 ? 0 : 1);
})();
