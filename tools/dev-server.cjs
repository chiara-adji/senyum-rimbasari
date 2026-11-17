// Server lokal untuk menguji index.html dan menyimpan screenshot bukti QA.
// GET  /...                 -> file statis dari root proyek
// POST /__evidence?name=xx  -> body PNG disimpan ke production/qa/evidence/xx.png
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), PORT = +process.env.PORT || 8123;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.png': 'image/png', '.css': 'text/css' };
http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  if (req.method === 'POST' && u.pathname === '/__evidence') {
    const name = (u.searchParams.get('name') || 'shot').replace(/[^a-z0-9._-]/gi, '_');
    const out = path.join(ROOT, 'production', 'qa', 'evidence', name + '.png');
    const chunks = []; req.on('data', c => chunks.push(c));
    req.on('end', () => { fs.writeFileSync(out, Buffer.concat(chunks)); res.end('ok ' + out); });
    return;
  }
  let p = path.normalize(path.join(ROOT, decodeURIComponent(u.pathname === '/' ? '/index.html' : u.pathname)));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.statusCode = 404; return res.end('404'); }
  res.setHeader('Content-Type', TYPES[path.extname(p)] || 'application/octet-stream');
  res.setHeader('Cache-Control', 'no-store');
  fs.createReadStream(p).pipe(res);
}).listen(PORT, () => console.log('http://localhost:' + PORT));
