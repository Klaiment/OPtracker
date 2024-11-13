import { config } from '../config.ts';
import Redis from 'ioredis';
import qs from 'qs';
import bencode from 'bencode';

const redis = new Redis({
  host: 'redis',
  port: 6379,
});

redis.on('connect', () => console.log('Connected to Redis!'));
redis.on('error', (err) => console.error('Redis connection error:', err));

type PeerCache = {
  [hash: string]: Set<string>;
};
const peerCache: PeerCache = {};

const binaryToHex = (b: string): string =>
  Buffer.from(b, 'binary').toString('hex');
const hexToBinary = (h: string): string =>
  Buffer.from(h, 'hex').toString('binary');

const cleanOldPeers = async (infoHash: string) => {
  const peers = await redis.smembers(`torrent:${infoHash}:peers`);
  const now = Date.now();
  const threshold = 30 * 60 * 1000; // 30 minutes

  peers.forEach(async (peer) => {
    const [ip, port, lastSeen] = peer.split(':');
    if (new Date(lastSeen).getTime() < now - threshold) {
      await redis.srem(`torrent:${infoHash}:peers`, peer);
      console.log(
        `[CLEANUP] Removed outdated peer ${ip}:${port} for infoHash ${infoHash}`,
      );
    }
  });
};

Bun.serve({
  port: config.PORT,
  hostname: '0.0.0.0',
  debug: true,
  async fetch(req: Request) {
    const url = new URL(req.url);

    if (url.pathname === '/' || url.pathname === '/home') {
      return new Response('Welcome to OPTracker!', {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    if (url.pathname.endsWith('/announce')) {
      if (config.HYBRID_TRACKER === 'private') {
        const passkey = url.pathname.split('/')[1];
        if (passkey) {
        } else {
          return new Response(
            bencode.encode({ 'failure reason': 'Passkey needed' }),
          );
        }
      }
      const q = req.url.split('?')[1];
      const params = qs.parse(q, { decoder: unescape });
      const infoHash = binaryToHex(params.info_hash as string);
      const ipClient =
        req.headers.get('cf-connecting-ip') ||
        req.headers.get('X-Real-IP') ||
        '';

      console.log(
        `[DEBUG] Received announce from IP ${ipClient} with infoHash: ${infoHash}`,
      );

      if (!infoHash || infoHash.length !== 40) {
        return new Response('Invalid info_hash length', { status: 400 });
      }

      await redis.sadd('torrents', infoHash);
      const peerEntry = `${ipClient}:${params.port}:${new Date().toISOString()}`;
      await redis.sadd(`torrent:${infoHash}:peers`, peerEntry);

      await cleanOldPeers(infoHash); // Clean old peers asynchronously

      const peers = await redis.smembers(`torrent:${infoHash}:peers`);
      const peersList = peers
        .map((peer) => {
          const [ip, port, lastSeen] = peer.split(':');
          return new Date(lastSeen).getTime() >= Date.now() - 30 * 60 * 1000
            ? { ip, port: parseInt(port) }
            : null;
        })
        .filter(Boolean);

      const responseToClient = {
        interval: 1800,
        complete: 0,
        incomplete: 0,
        peers: peersList,
      };

      return new Response(bencode.encode(responseToClient), {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    if (url.pathname === '/stats') {
      return new Response('Welcome to the stat page!', {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    if (url.pathname.startsWith('/redis')) {
      const hash = url.pathname.split('/')[2];
      const redisDatas = await redis.smembers(`torrent:${hash}:peers`);

      if (redisDatas.length === 0) {
        return new Response('No peers found.', {
          headers: { 'Content-Type': 'text/plain' },
        });
      }

      const responseBody = redisDatas.join('\n');
      return new Response(responseBody, {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    return new Response('Page not found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    });
  },
});

console.log(
  `Server running on ${config.WEBSITE_URL}${config.ENVIRONNEMENT === 'dev' ? ':' + config.PORT : ''}`,
);
