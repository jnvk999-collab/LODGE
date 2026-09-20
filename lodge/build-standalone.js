/* Builds single-file copies of both pages.
 *
 *   node build-standalone.js
 *
 * Why: the normal pages load config.js, a stylesheet, a script and SVG
 * images as separate requests. Every one of those is a chance for a proxy,
 * an in-app browser or a stale cache to serve something wrong, and a
 * half-loaded page looks broken with no explanation. The standalone copies
 * inline everything, so once the HTML arrives the page is complete.
 *
 * Output: standalone/front-desk.html and standalone/website.html
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'standalone');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');

// A replacement STRING treats $$ as an escape for a literal $, which would
// silently corrupt any $$ in the inlined code. Always inject via a function.
const put = v => () => v;

const imgs = {};
for (const f of fs.readdirSync(path.join(ROOT, 'site/img'))) {
  imgs['img/' + f] = 'data:image/svg+xml,' +
    encodeURIComponent(read('site/img/' + f).replace(/\s*\n\s*/g, ' '));
}

fs.mkdirSync(OUT, { recursive: true });

/* ---------------- front desk ---------------- */
{
  let h = read('pms/index.html');
  h = h.replace(/<link rel="stylesheet" href="css\/pms\.css">/,
                put('<style>\n' + read('pms/css/pms.css') + '\n</style>'));
  h = h.replace(/<script src="\.\.\/site\/config\.js"><\/script>\s*<script src="js\/pms\.js"><\/script>/,
                put('<script>\n' + read('site/config.js') +
                    '\n</script>\n<script>\n' + read('pms/js/pms.js') + '\n</script>'));
  fs.writeFileSync(path.join(OUT, 'front-desk.html'), h);
  console.log('front-desk.html', (h.length / 1024).toFixed(0) + ' KB');
}

/* ---------------- guest website ---------------- */
{
  let h = read('site/index.html');
  h = h.replace(/<link rel="stylesheet" href="css\/style\.css">/,
                put('<style>\n' + read('site/css/style.css') + '\n</style>'));
  h = h.replace(/<script src="config\.js"><\/script>\s*<script src="js\/main\.js"><\/script>/,
                put('<script>\n' + read('site/config.js') +
                    '\n</script>\n<script>\n' + read('site/js/main.js') + '\n</script>'));
  for (const [k, v] of Object.entries(imgs)) h = h.split('"' + k + '"').join('"' + v + '"');
  fs.writeFileSync(path.join(OUT, 'website.html'), h);
  console.log('website.html  ', (h.length / 1024).toFixed(0) + ' KB');
}
