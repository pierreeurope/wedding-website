const fs = require('fs');
const path = require('path');
const { Redis } = require('@upstash/redis');

const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

if (!redisUrl || !redisToken) {
  console.error('Missing Redis env vars');
  process.exit(1);
}

const redis = new Redis({ url: redisUrl, token: redisToken });

async function main() {
  const listRaw = await redis.get('rsvp:list');
  const ids = typeof listRaw === 'string' ? JSON.parse(listRaw) : (listRaw || []);
  const rsvps = [];

  for (const id of ids) {
    const raw = await redis.get(`rsvp:${id}`);
    if (!raw) continue;
    rsvps.push(typeof raw === 'string' ? JSON.parse(raw) : raw);
  }

  rsvps.sort((a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime());

  const outDir = path.join(process.cwd(), 'backups', 'rsvp');
  fs.mkdirSync(outDir, { recursive: true });

  const today = new Date().toISOString().slice(0, 10);
  const latestPath = path.join(outDir, 'latest.json');
  const datedPath = path.join(outDir, `${today}.json`);
  const payload = JSON.stringify({ exportedAt: new Date().toISOString(), count: rsvps.length, rsvps }, null, 2) + '\n';

  fs.writeFileSync(latestPath, payload);
  fs.writeFileSync(datedPath, payload);

  console.log(`Backed up ${rsvps.length} RSVPs to ${datedPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
