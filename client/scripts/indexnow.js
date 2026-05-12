import { readFileSync } from 'node:fs';
import { request } from 'node:https';

const KEY = 'FB80C6F0068F7B558C85580C784BA9EB';
const HOST = 'georankers.co';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);

if (urls.length === 0) {
  console.log('No URLs found in sitemap, skipping IndexNow ping.');
  process.exit(0);
}

const body = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
});

const options = {
  hostname: 'www.bing.com',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  },
};

console.log(`Submitting ${urls.length} URLs to IndexNow...`);

const req = request(options, (res) => {
  console.log(`IndexNow status: ${res.statusCode}`);
  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log('IndexNow ping successful.');
  } else {
    console.warn('IndexNow ping returned unexpected status — check above.');
  }
});

req.on('error', (err) => {
  // Non-fatal: don't fail the build if the ping fails
  console.error('IndexNow ping error:', err.message);
});

req.write(body);
req.end();
